from datetime import datetime, timedelta, timezone
import asyncio
import logging
import os
import secrets
import uuid
from pathlib import Path
from typing import List, Optional

import resend
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, FastAPI, Header, HTTPException, Query, Request
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, ConfigDict, EmailStr, Field
from starlette.middleware.cors import CORSMiddleware


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# Required production settings. Keeping these explicit makes misconfiguration fail
# at startup instead of silently disabling contact delivery.
resend.api_key = os.environ["RESEND_API_KEY"]
SENDER_EMAIL = os.environ["SENDER_EMAIL"]
CONTACT_RECIPIENT = os.environ["CONTACT_RECIPIENT"]
ADMIN_API_KEY = os.environ.get("ADMIN_API_KEY", "").strip()

# MongoDB connection
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI()
api_router = APIRouter(prefix="/api")
logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Shared models
# ---------------------------------------------------------------------------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactMessage(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=1, max_length=5000)
    website: str = ""
    elapsed_ms: int = 0


class ContactMessageAdmin(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str
    name: str
    email: EmailStr
    message: str
    ip: Optional[str] = None
    created_at: str


class BlogSection(BaseModel):
    h: str = Field(min_length=1, max_length=200)
    body: List[str] = Field(min_length=1)


class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(min_length=1, max_length=120)
    num: str = Field(min_length=1, max_length=10)
    title: str = Field(min_length=1, max_length=200)
    excerpt: str = Field(min_length=1, max_length=500)
    date: str = Field(min_length=1, max_length=40)
    readTime: str = Field(min_length=1, max_length=40)
    tags: List[str] = Field(min_length=1, max_length=10)
    image: str = Field(min_length=1, max_length=2000)
    content: List[BlogSection] = Field(min_length=1)


class BlogPostCreate(BlogPost):
    pass


class BlogPostUpdate(BaseModel):
    num: Optional[str] = Field(default=None, min_length=1, max_length=10)
    title: Optional[str] = Field(default=None, min_length=1, max_length=200)
    excerpt: Optional[str] = Field(default=None, min_length=1, max_length=500)
    date: Optional[str] = Field(default=None, min_length=1, max_length=40)
    readTime: Optional[str] = Field(default=None, min_length=1, max_length=40)
    tags: Optional[List[str]] = Field(default=None, min_length=1, max_length=10)
    image: Optional[str] = Field(default=None, min_length=1, max_length=2000)
    content: Optional[List[BlogSection]] = Field(default=None, min_length=1)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def _contact_html(m: ContactMessage) -> str:
    return f"""
    <table style="width:100%;max-width:600px;font-family:Courier,monospace;border:1px solid #ddd;border-collapse:collapse">
      <tr><td style="background:#0a0a09;color:#c6ff2e;padding:14px 18px;font-weight:bold">NEW PORTFOLIO MESSAGE</td></tr>
      <tr><td style="padding:14px 18px"><b>From:</b> {m.name} &lt;{m.email}&gt;</td></tr>
      <tr><td style="padding:0 18px 14px;white-space:pre-wrap">{m.message}</td></tr>
    </table>
    """


def require_admin(x_admin_key: Optional[str] = Header(default=None)) -> None:
    """Protect administrative routes with a constant-time API-key comparison."""
    if not ADMIN_API_KEY:
        raise HTTPException(status_code=503, detail="Admin API is not configured")
    if not x_admin_key or not secrets.compare_digest(x_admin_key, ADMIN_API_KEY):
        raise HTTPException(status_code=401, detail="Invalid admin credentials")


# ---------------------------------------------------------------------------
# Public contact and status routes
# ---------------------------------------------------------------------------
@api_router.post("/contact")
async def submit_contact(m: ContactMessage, request: Request):
    forwarded_for = request.headers.get("x-forwarded-for")
    client_host = request.client.host if request.client else "unknown"
    ip = (forwarded_for or client_host).split(",")[0].strip()

    # Honeypot filled or submitted inhumanly fast -> silently drop.
    if m.website or m.elapsed_ms < 2500:
        logger.warning("Spam dropped from %s (honeypot=%s, elapsed=%sms)", ip, bool(m.website), m.elapsed_ms)
        return {"status": "sent"}

    hour_ago = (datetime.now(timezone.utc) - timedelta(hours=1)).isoformat()
    recent = await db.contact_messages.count_documents({"ip": ip, "created_at": {"$gte": hour_ago}})
    if recent >= 5:
        raise HTTPException(status_code=429, detail="Too many messages. Please try again later.")

    doc = m.model_dump(exclude={"website", "elapsed_ms"})
    doc["id"] = str(uuid.uuid4())
    doc["ip"] = ip
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.contact_messages.insert_one(doc)

    params = {
        "from": SENDER_EMAIL,
        "to": [CONTACT_RECIPIENT],
        "reply_to": m.email,
        "subject": f"Portfolio contact — {m.name}",
        "html": _contact_html(m),
    }
    try:
        email = await asyncio.to_thread(resend.Emails.send, params)
    except Exception as exc:
        logger.error("Resend send failed: %s", exc)
        raise HTTPException(status_code=502, detail="Message saved but email delivery failed") from exc
    return {"status": "sent", "email_id": email.get("id")}


@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check["timestamp"], str):
            check["timestamp"] = datetime.fromisoformat(check["timestamp"])
    return status_checks


# ---------------------------------------------------------------------------
# Public blog read routes
# ---------------------------------------------------------------------------
@api_router.get("/blog", response_model=List[BlogPost])
async def list_blog_posts():
    posts = await db.blog_posts.find({}, {"_id": 0}).sort("num", 1).to_list(100)
    return posts


@api_router.get("/blog/{post_id}", response_model=BlogPost)
async def get_blog_post(post_id: str):
    post = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return post


# ---------------------------------------------------------------------------
# Protected administration routes
# ---------------------------------------------------------------------------
@api_router.get("/admin/contact-messages", response_model=List[ContactMessageAdmin], dependencies=[Depends(require_admin)])
async def list_contact_messages(limit: int = Query(default=100, ge=1, le=500)):
    messages = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return messages


@api_router.post("/admin/blog", response_model=BlogPost, status_code=201, dependencies=[Depends(require_admin)])
async def create_blog_post(post: BlogPostCreate):
    existing = await db.blog_posts.find_one({"id": post.id}, {"_id": 1})
    if existing:
        raise HTTPException(status_code=409, detail="A blog post with this id already exists")
    doc = post.model_dump()
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    doc["updated_at"] = doc["created_at"]
    await db.blog_posts.insert_one(doc)
    return post


@api_router.patch("/admin/blog/{post_id}", response_model=BlogPost, dependencies=[Depends(require_admin)])
async def update_blog_post(post_id: str, changes: BlogPostUpdate):
    update = {key: value for key, value in changes.model_dump().items() if value is not None}
    if not update:
        raise HTTPException(status_code=400, detail="No changes supplied")
    update["updated_at"] = datetime.now(timezone.utc).isoformat()
    result = await db.blog_posts.update_one({"id": post_id}, {"$set": update})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")
    post = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    return post


@api_router.delete("/admin/blog/{post_id}", status_code=204, dependencies=[Depends(require_admin)])
async def delete_blog_post(post_id: str):
    result = await db.blog_posts.delete_one({"id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)


@app.on_event("startup")
async def ensure_indexes():
    await db.blog_posts.create_index("id", unique=True)
    await db.contact_messages.create_index([("ip", 1), ("created_at", -1)])


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
