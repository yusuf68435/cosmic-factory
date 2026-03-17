# COSMIC FACTORY — App Store Yayınlama Rehberi
### Kopyala-Yapıştır Hazır | Adım Adım Talimatlar

---

## ADIM 1: Apple Developer Hesabı Aç

1. https://developer.apple.com adresine git
2. "Enroll" butonuna tıkla, yıllık **$99** ücreti öde
3. Onay **24-48 saat** sürebilir

---

## ADIM 2: Bilgisayarına Araçları Kur

Terminalde sırayla çalıştır:

```bash
npm install -g eas-cli
eas login
```

> Expo hesabın yoksa https://expo.dev adresinden ücretsiz oluştur.

---

## ADIM 3: Proje Bağla

```bash
cd CosmicFactoryExpo
eas init
```

Bu komut `app.json` içindeki `projectId`'yi otomatik doldurur.

---

## ADIM 4: Gizlilik Politikasını Yayınla (GitHub Pages — Ücretsiz)

1. **github.com** → Yeni repo oluştur: `cosmic-factory-privacy`
2. Repo içine `CosmicFactoryExpo/assets/privacy-policy.html` dosyasını yükle
3. **Settings → Pages → Source:** main branch → **Save**
4. ~2 dakika bekle, URL hazır:

```
https://KULLANICIADIN.github.io/cosmic-factory-privacy/privacy-policy.html
```

> `KULLANICIADIN` yerine kendi GitHub kullanıcı adını yaz.

---

## ADIM 5: Build Al

```bash
cd CosmicFactoryExpo
eas build --platform ios --profile production
```

- İlk seferde Apple Developer kimlik bilgilerini girmen istenecek
- Build süresi: **~15-30 dakika**

---

## ADIM 6: App Store'a Gönder

```bash
eas submit --platform ios --profile production
```

---

## ADIM 7: App Store Connect'te Metadata Gir

**https://appstoreconnect.apple.com** adresine git, uygulamayı oluştur ve aşağıdakileri yapıştır:

---

### ✏️ KOPYALANACAKBİLGİLER

**Uygulama Adı:**
```
Cosmic Factory - Idle Fabrika
```

**Alt Başlık (Subtitle):**
```
Uzay Fabrikası Simülasyonu
```

**Birincil Kategori:** `Games → Simulation`
**İkincil Kategori:** `Games → Casual`

**Fiyat:** `Ücretsiz (Free)`

**Yaş Derecelendirme:** `4+` (Tüm sorulara "Hayır/Yok" de)

**Bundle ID:** `com.yusufuyar.cosmicfactory`

---

### 🔑 Anahtar Kelimeler (Keywords — max 100 karakter)

```
idle,fabrika,uzay,cosmic,factory,oyun,tıklama,galaksi,kaynak,simülasyon
```

---

### 📝 Açıklama (Description) — Olduğu Gibi Kopyala

```
Uzayın derinliklerinde kendi kozmik fabrikani kur ve yönet!

Cosmic Factory, bağımlılık yapan bir idle fabrika oyunudur. Parmağınızın ucuyla kozmik toz toplayın, fabrikalarınızı yükseltin, galaksileri keşfedin ve evreninizi genişletin.

ÖZELLİKLER:
• 6 farklı fabrika ve yükseltme kategorisi
• Galaksi keşif sistemi ile 6 sektör
• Prestij mekanizması ile sonsuz ilerleme
• Günlük görevler ve başarı sistemi
• Karanlık madde mağazası
• Kozmik fırtınalar ve asteroid olayları
• Otomatik kaynak toplama (Auto-Tap)
• Çevrimdışı ilerleme
• Liderler sıralaması
• Oyun rehberi ve ayarlar paneli

Tamamen ücretsiz, reklamsız ve internet gerektirmez!
```

---

### 📱 Ekran Görüntüleri (Min 3, Max 10)

Simülatörden veya gerçek cihazdan al. Boyut: **1290×2796** (iPhone 15 Pro Max)

| # | Ekran | Ne Göster |
|---|-------|-----------|
| 1 | Ana Ekran | Gezegen, toz sayacı, fabrikalar görünsün |
| 2 | Fabrikalar | Yükseltme kartları açık, birkaç fabrika alınmış |
| 3 | Galaksi Haritası | Galaksi sektörleri görünsün |
| 4 | Başarılar | Başarı paneli açık, birkaçı kazanılmış |
| 5 | Ayarlar | Ayarlar paneli açık, istatistikler görünsün |

> iPad desteği açık olduğu için iPad ekran görüntüsü de gerekebilir (2048×2732).

---

## ADIM 8: İncelemeye Gönder

App Store Connect'te:
1. Ekran görüntülerini yükle
2. Açıklama + metadata yapıştır
3. Gizlilik politikası URL'sini gir
4. Yaş derecelendirme anketini doldur
5. **"İncelemeye Gönder"** butonuna bas

> Apple incelemesi genellikle **24-48 saat** sürer.

---

## ✅ KONTROL LİSTESİ

- [ ] Apple Developer hesabı aktif ($99/yıl)
- [ ] `eas-cli` kuruldu + `eas login` yapıldı
- [ ] `eas init` ile projectId alındı
- [ ] Gizlilik politikası GitHub Pages'e yüklendi
- [ ] `eas build --platform ios --profile production` başarılı
- [ ] App Store Connect'te uygulama oluşturuldu
- [ ] Açıklama, anahtar kelimeler yapıştırıldı
- [ ] Ekran görüntüleri yüklendi (min 3 adet)
- [ ] Gizlilik URL girildi
- [ ] Yaş derecelendirme anketi tamamlandı
- [ ] `eas submit --platform ios` çalıştırıldı
- [ ] İncelemeye gönderildi
