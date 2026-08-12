import asyncio
import json
import os
from pathlib import Path

from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient


ROOT_DIR = Path(__file__).resolve().parents[1]
load_dotenv(ROOT_DIR / ".env")
DATA_PATH = ROOT_DIR / "data" / "blog_posts.json"


async def main() -> None:
    client = AsyncIOMotorClient(os.environ["MONGO_URL"])
    try:
        db = client[os.environ["DB_NAME"]]
        posts = json.loads(DATA_PATH.read_text())
        operations = []
        for post in posts:
            operations.append({"replace_one": {"filter": {"id": post["id"]}, "replacement": post, "upsert": True}})

        if operations:
            result = await db.blog_posts.bulk_write(operations)
            print(f"Seeded {len(posts)} blog posts (inserted={result.upserted_count}, modified={result.modified_count}).")
    finally:
        client.close()


if __name__ == "__main__":
    asyncio.run(main())
