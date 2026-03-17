# Cosmic Factory - App Store Yayın Rehberi

## 1. Ön Gereksinimler

- **Apple Developer Hesabı** ($99/yıl): https://developer.apple.com
- **EAS CLI**: `npm install -g eas-cli`
- **Expo hesabı**: `eas login`

## 2. EAS Proje Bağlantısı

```bash
cd CosmicFactoryExpo
eas init
```
Bu komut `app.json` içindeki `extra.eas.projectId` alanını otomatik dolduracaktır.

## 3. Build Alma

```bash
# Test build (dahili dağıtım)
eas build --platform ios --profile preview

# Production build (App Store için)
eas build --platform ios --profile production
```

İlk build'de Apple Developer kimlik bilgilerinizi girmeniz istenecek.

## 4. App Store Connect Bilgileri

### Uygulama Adı
**Cosmic Factory - Idle Fabrika**

### Alt Başlık (Subtitle)
**Uzay Fabrikası Simülasyonu**

### Açıklama (Description)
```
Uzayın derinliklerinde kendi kozmik fabrikanı kur ve yönet!

Cosmic Factory, bağımlılık yapan bir idle fabrika oyunudur. Kaynak toplayın, fabrikalarınızı yükseltin, yeni galaksiler keşfedin ve kozmik imparatorluğunuzu genişletin.

ÖZELLİKLER:
• Kaynak toplama ve fabrika yönetimi
• 10+ farklı yükseltme kategorisi
• Galaksi keşif sistemi
• Prestige mekanizması ile sonsuz ilerleme
• Görev ve başarı sistemi
• Karanlık madde mağazası
• Otomatik kaynak toplama
• Çevrimdışı ilerleme

Tamamen ücretsiz, reklamsız ve internet gerektirmez!
```

### Anahtar Kelimeler (Keywords - max 100 karakter)
```
idle,fabrika,uzay,cosmic,factory,oyun,tıklama,galaksi,kaynak,simülasyon
```

### Kategori
- Birincil: **Games > Simulation**
- İkincil: **Games > Casual**

### Yaş Derecelendirmesi
- **4+** (Şiddet, kumar, yetişkin içerik yok)

### Fiyat
- **Ücretsiz**

### Gizlilik Politikası URL'si
Gizlilik politikası HTML dosyası projeye dahildir. Bunu GitHub Pages, Netlify veya benzeri bir servise yükleyip URL'sini App Store Connect'e girin.

Örnek: `https://yourusername.github.io/cosmic-factory/privacy-policy.html`

## 5. Ekran Görüntüleri

Mevcut ekran görüntüleri `AppStore_Gorseller/` klasöründe:
- 6 adet 1284x2778 (iPhone 14 Pro Max) - ✅ Hazır

### Gerekli Ek Boyutlar
- **6.7" iPhone** (1290x2796): Mevcut görüntüler kabul edilebilir
- **5.5" iPhone** (1242x2208): Opsiyonel
- **iPad Pro 12.9"** (2048x2732): iPad desteği açıksa gerekli

## 6. App Store'a Gönderme

```bash
# Build tamamlandıktan sonra
eas submit --platform ios --profile production
```

## 7. Kontrol Listesi

- [ ] Apple Developer hesabı aktif
- [ ] `eas init` ile proje bağlandı
- [ ] `eas build --platform ios --profile production` başarılı
- [ ] App Store Connect'te uygulama oluşturuldu
- [ ] Açıklama, anahtar kelimeler, ekran görüntüleri yüklendi
- [ ] Gizlilik politikası URL'si girildi
- [ ] Yaş derecelendirmesi tamamlandı
- [ ] `eas submit` ile gönderildi
- [ ] Apple inceleme sonucu bekleniyor
