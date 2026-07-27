# Tài Trần × HTG

Website business card xây dựng bằng React, TypeScript, Vite và Tailwind CSS. Dữ liệu VNINDEX được lấy qua VNDIRECT Finfo bằng backend proxy.

## Chạy local đầy đủ frontend + backend

```bash
npm install
npm run build
npm start
```

Mở `http://localhost:4173`.

Kiểm tra API:

```bash
curl "http://localhost:4173/api/market?symbol=VNINDEX"
```

## Kiểm tra trước khi deploy

```bash
npm run check
```

## Cấu trúc deploy Vercel

- `dist/`: frontend production do Vite tạo.
- `api/market.ts`: Vercel Function cho `/api/market`.
- `server/market-provider.ts`: logic lấy và chuẩn hóa dữ liệu dùng chung.
- `server/index.ts`: server Express chỉ dùng khi chạy local hoặc trên máy chủ Node truyền thống.
- `vercel.json`: cấu hình Vite, Function và security headers.

Vercel không chạy `npm start` và không sử dụng `app.listen()`. Khi deploy, Vercel tự nhận `api/market.ts` thành Function.

## Deploy qua GitHub

```bash
git add .
git commit -m "Prepare Vercel deployment"
git branch -M main
git remote add origin https://github.com/USERNAME/taitran-broker.git
git push -u origin main
```

Sau đó vào Vercel:

1. Chọn **Add New → Project**.
2. Import repository `taitran-broker`.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Nhấn **Deploy**.

Không cần API key. Biến môi trường `VNDIRECT_API_BASE_URL=https://api-finfo.vndirect.com.vn` là tùy chọn vì source đã có giá trị mặc định.

Sau deploy, kiểm tra:

```text
https://TEN-DU-AN.vercel.app/
https://TEN-DU-AN.vercel.app/api/market?symbol=VNINDEX
```

## Deploy bằng Vercel CLI

```bash
npm install --global vercel
vercel login
vercel
vercel --prod
```

## Cập nhật website

```bash
npm run check
git add .
git commit -m "Update website"
git push
```

Vercel sẽ tự động tạo deployment mới khi branch production được cập nhật.
