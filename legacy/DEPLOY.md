# Deploy Rivera → GitHub + Vercel

## Bước 1 — Đưa lên GitHub (chạy trong Terminal trên máy Mac)

> Sandbox của Claude đã tạo một thư mục `.git` nửa vời (không xóa được file khóa).
> Lệnh `rm -rf .git` đầu tiên sẽ xoá nó và làm lại sạch sẽ.

```bash
cd ~/Desktop/Rivera-Website

# 1. Xoá repo nửa vời do sandbox tạo + làm lại sạch
rm -rf .git
git init
git add -A
git commit -m "Initial commit: Rivera boutique property website"
git branch -M main

# 2. Tạo repo trống trên github.com (KHÔNG thêm README/.gitignore),
#    rồi thay <USER>/<REPO> bằng repo của bạn:
git remote add origin https://github.com/<USER>/<REPO>.git
git push -u origin main
```

`.gitignore` đã loại sẵn các thư mục nặng/rác → repo còn ~39MB thay vì 212MB:
`Projects/` (135MB ảnh gốc), `_sheets/` (54MB), `.DS_Store`, `*.xlsx`, file tạm `~$`, `.claude/`.

## Bước 2 — Connect Vercel

1. vercel.com → **Add New… → Project** → import repo vừa push.
2. Framework Preset: **Other**. Build Command: để trống. Output Directory: để trống (site tĩnh ở gốc).
3. **Deploy** → bạn có URL `*.vercel.app` (đây là bản staging để xem live).

Mỗi lần `git push` về `main` → Vercel tự deploy lại. Không cần build step.

## Bước 3 — Trỏ domain rivera.au (CHỈ làm sau khi xong "must-fix" bên dưới)

Trong Vercel: Project → **Settings → Domains** → add `rivera.au` (và `www.rivera.au`).
Vercel sẽ cho bản ghi DNS (A `76.76.21.21` hoặc CNAME) để cập nhật ở nơi quản lý domain `.au`.

---

## ⚠️ Must-fix TRƯỚC khi trỏ rivera.au (không chặn staging)

- [ ] **Form enquiry**: thay `YOUR_FORM_ID` (Formspree) ở tất cả các trang — nếu không, lead gửi đi sẽ mất.
- [ ] **Email thật**: thay `hello@rivera.estate`.
- [ ] **Founder/dữ liệu thật**: "Elena Rivera" + một số dự án vẫn là mẫu/hư cấu → rủi ro uy tín.
- [ ] **Pháp lý AU**: số giấy phép môi giới (agent licence) ở footer + trang **privacy policy** (bắt buộc khi thu thập enquiry).
- [ ] *(nice-to-have)* thay hero video stock Mixkit bằng footage thật.

## Có thể sửa dần sau khi live (không gấp)

- Tối ưu ảnh (`images/` ~23MB) → nén/webp cho tốc độ.
- Trang chi tiết cho các dự án còn thiếu ảnh thật.
- favicon/OG image kiểm tra share preview.
