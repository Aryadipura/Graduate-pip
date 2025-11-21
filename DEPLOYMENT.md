# Cara Deploy Website ke GitHub Pages

## Status
✅ Code sudah di-push ke branch `gh-pages` di GitHub

## Langkah-langkah untuk Mengaktifkan GitHub Pages:

1. **Buka Repository di GitHub**
   - Buka: https://github.com/Aryadipura/Graduate-pip

2. **Aktifkan GitHub Pages**
   - Klik **Settings** (di menu atas repository)
   - Scroll ke bagian **Pages** (di sidebar kiri)
   - Di bagian **Source**, pilih:
     - Branch: `gh-pages`
     - Folder: `/ (root)`
   - Klik **Save**

3. **Tunggu Deployment** (biasanya 1-2 menit)

4. **Website Anda akan tersedia di:**
   ```
   https://aryadipura.github.io/Graduate-pip/
   ```

## Catatan:
- Website akan otomatis update setiap kali Anda push ke branch `gh-pages`
- Perubahan mungkin membutuhkan waktu beberapa menit untuk muncul
- Pastikan semua asset (gambar, musik, CSS, JS) sudah ter-push

## Cara Update Website:
1. Edit file di local
2. Commit perubahan:
   ```bash
   git add .
   git commit -m "Update message"
   git push origin gh-pages
   ```
3. Tunggu 1-2 menit untuk deployment

## Alternatif (Jika GitHub Pages tidak aktif):
Jika GitHub Pages tidak bisa diaktifkan, Anda bisa menggunakan:
- **Vercel** (https://vercel.com) - Import dari GitHub, otomatis deploy
- **Netlify** (https://netlify.com) - Drag & drop folder atau connect GitHub


