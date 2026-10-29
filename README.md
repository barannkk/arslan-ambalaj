# Arslan Ambalaj

Next.js, React ve Tailwind CSS ile hazırlanmış kurumsal ambalaj sitesi. Pasta kutuları, pasta altlıkları, kargo kutuları ve diğer ambalaj modellerinden oluşan 16 ürün içerir.

## Yerel çalıştırma

Node.js 22 veya üzeri ve pnpm 11.25.0 gerekir.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

## GitHub Pages

Depo ayarlarında **Settings → Pages → Source → GitHub Actions** seçilir. `main` dalına gönderilen değişiklikler `.github/workflows/pages.yml` üzerinden derlenip yayımlanır. Alt dizindeki görseller, fontlar ve JavaScript dosyaları Pages adresine göre hazırlanır.

```bash
NEXT_PUBLIC_BASE_PATH=/arslan-ambalaj pnpm build
```

Statik çıktı `out/` dizinine yazılır. Alan adı kökünde yayın için `NEXT_PUBLIC_BASE_PATH` boş bırakılır.

## İçerik ve çalışma durumu

- Mobil menü, kategori filtreleri, ürün detayları ve ürün türünü teklif formuna taşıyan bağlantılar hazırdır.
- Form şu anda ziyaretçinin e-posta uygulamasında teklif taslağı açar. Sunucudan e-posta gönderimi sonraki geliştirme aşamasıdır.
- Alıcı adresi, tasarımda verilen `info@arslanambalaj.com` adresidir; gerçek yayından önce doğrulanmalıdır.
- Ürün görselleri sunum amacıyla hazırlanmıştır. Ölçü, fiyat, stok veya sertifika bilgisi varsayılmamıştır.
- Telefon, açık adres ve sosyal medya bağlantıları doğrulanmış bilgiler sağlandığında eklenebilir.
