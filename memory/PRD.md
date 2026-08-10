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

## Backlog
- P1: Hubungkan Contact Form ke backend FastAPI / email service
- P2: Update konten `mock.js` (email, sosial link asli — masih PLACEHOLDER)
- P2: Node engine warning `camera-controls`
- P2: (Opsional) pindahkan blog ke backend MongoDB + CMS sederhana

## Catatan
- User selalu minta "without test, i will test my self" → hanya smoke-test screenshot dilakukan, testing agent penuh tidak dijalankan atas permintaan user.
- Tidak ada kredensial/auth di app ini.
