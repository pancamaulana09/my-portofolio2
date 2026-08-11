# PRD — Portfolio Panca Maulana (my-portofolio2)

## Original Problem Statement
Clone repo publik https://github.com/pancamaulana09/my-portofolio2.git, jalankan preview, perbaiki bug UI, dan kembangkan fitur baru. Bahasa user: **Indonesia**.

## Arsitektur
- Frontend: React (CRA + Craco), TailwindCSS, Framer Motion, Three.js — `/app/frontend`
- Backend: FastAPI + MongoDB (hanya /api/status) — `/app/backend`
- Konten statis via `/app/frontend/src/mock.js` dan `/app/frontend/src/blogData.js`
- Design DNA: hitam #0a0a09, paper #edebe6, lime #c6ff2e, blue #1400ff, font Courier Prime (mono) + Helvetica (grot), kelas CSS prefix `x-` di `src/styles/site.css`

## Selesai (per tanggal)
- 2026-06 (sesi sebelumnya): Clone repo, setup dependencies, servis berjalan via supervisor.
- 2026-06 (sesi sebelumnya): Fix viewport jump saat auto-advance gallery `ShowcaseTheater.jsx` (scrollIntoView → container scrollTo). User test sendiri.
- 2026-06-10 (sesi ini): **Fitur Blog/Journal lengkap**:
  - `src/blogData.js` — 6 artikel (data mock)
  - `src/components/site/BlogCard.jsx` — kartu blog reusable
  - `src/components/site/sections/BlogJournal.jsx` — section "Journal" di Home (4 kartu, setelah Achievements)
  - `src/pages/Blog.jsx` — halaman listing `/blog` (heading DecodeText, "Showing all 06 posts", grid)
  - `src/pages/BlogDetail.jsx` — halaman `/blog/:slug` (judul besar, meta Published/Read time/Topics, tombol share X/LinkedIn/WhatsApp/Copy link, konten, cover sticky)
  - `src/components/site/CircularGallery.jsx` — galeri drag melengkung (arc + tilt, badge DRAG lime, tombol panah, klik → post) di bawah detail blog, mengikuti referensi Codapress
  - Nav "BLOG" ditambah di `mock.js`; route di `App.js`; CSS `x-blog-*` & `x-circ-*` di `site.css`
  - Responsive: grid 4→2→1 kolom, gallery card 58vw di mobile, cover non-sticky mobile
  - Self-tested via screenshot: /blog ✅, /blog/:slug ✅, circular gallery ✅ (5 kartu, arc benar), mobile ✅, Home section terverifikasi via DOM (screenshot Home timeout karena font-loading tooling, pre-existing)
- 2026-06-10 (sesi ini): **Contact Form aktif via Resend**:
  - Backend: `POST /api/contact` (validasi Pydantic + EmailStr) — simpan ke MongoDB `contact_messages` lalu kirim email via Resend (`asyncio.to_thread`, reply_to = email pengirim)
  - `.env` backend: RESEND_API_KEY, SENDER_EMAIL=onboarding@resend.dev, CONTACT_RECIPIENT=pancamaulana2003@gmail.com (HARUS lowercase — Resend testing mode case-sensitive terhadap email akun)
  - Frontend `Contact.jsx`: fetch ke REACT_APP_BACKEND_URL/api/contact, toast sukses/gagal (mock localStorage dihapus)
  - Email placeholder di `mock.js` diganti ke pancamaulana2003@gmail.com
  - Tested: curl 200 + email_id ✅, validasi 422 ✅, e2e UI submit → toast MESSAGE SENT + form reset ✅
  - Catatan: Resend testing mode hanya bisa kirim ke email akun sendiri; untuk kirim dari domain sendiri perlu verifikasi domain di resend.com/domains
- 2026-06-10 (sesi ini): **Anti-spam form kontak (3 lapis)**:
  - Honeypot: field `website` tersembunyi (off-screen) di `Contact.jsx`; jika terisi → backend balas sukses palsu, tidak kirim email
  - Time-check: `elapsed_ms` (waktu render→submit) dikirim frontend; < 2500ms → drop diam-diam
  - Rate limit: maks 5 pesan/jam per IP (x-forwarded-for, dihitung dari `contact_messages` di Mongo, field `ip` disimpan) → 429 + toast "SLOW DOWN"
  - Tested: honeypot ✅ (fake 200, log "Spam dropped"), fast-submit ✅, rate limit 429 ✅ (via injeksi 5 doc + cleanup), pengunjung asli tetap sukses dari UI ✅
- 2026-06-10 (sesi ini): **Mosaic Scroll Reveal section** (`MosaicReveal.jsx`, setelah Hero di Home):
  - Reveal aditif sesuai spek user: 0% kosong hitam → tile bertambah bertahap (kurva piecewise 4→8→20→30→48→65→80→96 tile) → 100% gambar utuh mulus, dua arah (maju/mundur)
  - Gambar: `/app/frontend/public/assets/reveal-ride.jpg` (upload user, POV sepeda 2:3, 98KB) — nyambung dengan project Gowes/Fenomena Bike
  - Teknik: sticky 380vh + useScroll framer-motion; grid tile background-position (8×12 desktop, 6×9 mobile); update DOM langsung via useMotionValueEvent (tanpa React re-render, performa terbaik); tile scatter acak deterministik (mulberry32 seed), blur/rotasi/offset menyusut ke 0; swap ke <img> solid di p≥0.94 agar bebas seam; prefers-reduced-motion → gambar statis
  - Copy DNA: "Pieces become products." + counter Assembly % lime, kelas `x-mosaic-*` di site.css
  - Tested via DOM metrics & screenshot: 0%→0 tile, 10%→3, 30%→20, 50%→48/96, 70%→76, 100%→96 + full image; reverse scroll ✅; mobile 54 tile ✅
- 2026-06-10 (sesi ini): **Campaign Media (video ads + poster) di Project Detail**:
  - Aset user di `/app/frontend/public/assets/`: fenomena-ad.mp4 + suricon-ad.mp4 (6.5MB, 7 detik, 720p), poster kampanye (JPEG q85), poster frame video untuk instant paint
  - `mock.js`: field `media` {video, videoPoster, poster, posterAlt, accent} pada project `gowes-cyclequest` (aksen merah #ff3b30) & `worvia-erp` (aksen emas #f5b52e)
  - `ProjectMedia.jsx` (components/site): section "( Campaign ) — Film & poster" di ProjectDetail; video 16:9 autoplay-muted via IntersectionObserver (play ≥50% terlihat, pause di luar), kontrol custom play/pause + mute (set DOM property langsung — atribut `muted` React tidak sync, sudah difix), preload=metadata + poster attr; poster tall dengan lightbox portal (Escape/klik untuk tutup, body scroll lock); reveal framer-motion; badge PROMO FILM warna aksen per project
  - Tested: autoplay ✅, unmute ✅, pause/resume ✅, auto-pause out-of-view ✅, lightbox open/close ✅, mobile stack ✅, kedua halaman project ✅
- 2026-08-11 (sesi ini): **Hero Home redesign — editorial blue · pixel type · B&W 3D**
  - Referensi visual: 2xa.studio/about (biru penuh, patung 3D B&W, mono type, layout editorial)
  - `public/index.html`: tambahkan Google Font `VT323` (pixel/mono retro)
  - `site.css`: `--x-pixel: 'VT323'`; redirect `--x-lime` → `#ffffff`; ganti semua hardcode `rgba(198,255,46,*)` → white rgba; rewrite blok `.x-hero` menjadi layout editorial (bg `--x-blue #1400ff`, `.x-hero-noise` scanlines + `.x-hero-grain` SVG noise + `.x-hero-brackets` frame + `.x-hero-ticker` + `.x-hero-giant` + `.x-hero-rows` + `.x-hero-strip`); responsive breakpoint 900px (giant 26vw, rows single-column, brackets hidden)
  - `Hero.jsx` (rewrite): hapus GlitchCanvas / crowd / media upload / parallax; render `<Character3D>` full-viewport + `useCityClock` (JKT/ATH via Intl.DateTimeFormat, tick 30s); teks besar "Panca" + "M" ghost, 3 baris meta (role, tagline, city), bottom strip `SELECTED WORK · IN NO PARTICULAR ORDER`
  - `Character3D.jsx` (rewrite): hapus OrbitControls; custom pointer handler di wrapper `<div>` — pointerdown menunda keputusan sampai gerakan cukup jauh (6px), jika `|dy|>|dx|` release pointer supaya page scroll (mobile Y-scroll pass-through); jika horizontal menang → `setPointerCapture` + akumulasi rotasi ke `dragOffsetRef`; `useFrame` menambah `autoRot.current += 0.35*delta` (auto L→R) lalu `rotation.y = autoRot + dragOffset`; canvas `touch-action: pan-y`, filter grayscale(1) contrast(1.1) supaya patung monokrom
  - `Home.jsx`: hapus import + render `Achievements` (Capabilities) dan `ReadySection`
  - Palette final Home: biru `#1400ff`, hitam `#0a0a09`, putih `#dededa/#f6f6f2` — **tidak ada** hijau/lime lagi di viewport utama
  - Verified: desktop 1920×900 & mobile 390×844 screenshot ✅; `data-testid`: hero-section, hero-3d-layer, hero-3d-wrap, hero-3d-canvas, hero-giant, hero-ticker, hero-rows, hero-strip, hero-clock-jkt, hero-clock-ath; vertical touch drag di area 3D → scrollY naik 300px ✅



## Backlog
- P2: Update link sosial asli lain di `mock.js` (GitHub sudah asli; email SUDAH diganti ke pancamaulana2003@gmail.com)
- P2: Node engine warning `camera-controls`
- P2: (Opsional) pindahkan blog ke backend MongoDB + CMS sederhana
- P2: (Opsional) endpoint admin untuk melihat pesan kontak tersimpan di MongoDB

## Catatan
- User selalu minta "without test, i will test my self" → hanya smoke-test screenshot dilakukan, testing agent penuh tidak dijalankan atas permintaan user.
- Tidak ada kredensial/auth di app ini.
