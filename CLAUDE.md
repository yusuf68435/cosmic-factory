# Cosmic Factory — Claude Talimatları

## Proje Özeti
React Native + Expo WebView oyunu. Ana oyun dosyası `cosmic_factory.html`, asset olarak `CosmicFactoryExpo/assets/gameHtml.js` içine stringleştirilmiş halde tutuluyor.

## Her Değişiklikten Sonra Yapılacaklar
1. `cosmic_factory.html` düzenlendikten sonra `gameHtml.js`'i yeniden oluştur:
   ```bash
   node -e "const fs=require('fs');const html=fs.readFileSync('cosmic_factory.html','utf8');fs.writeFileSync('CosmicFactoryExpo/assets/gameHtml.js','const gameHtml = '+JSON.stringify(html)+';\nexport default gameHtml;\n');"
   ```
2. Değişiklikleri preview sunucusunda test et.

## UI İnceleme Kuralı — HER SEFERINDE UYGULANIR
Herhangi bir arayüz değişikliği yapılırken veya inceleme istendiğinde:

### Tasarımcı Gözüyle Bak:
- Hizalama, boşluk, renk tutarlılığı
- Font boyutları (minimum .68rem)
- Buton hiyerarşisi ve CTA netliği
- Boş durumlar (empty states)
- Yükleme/geçiş animasyonları
- Renk kontrastı ve okunabilirlik

### Oyuncu Gözüyle Bak:
- "Ne yapmalıyım?" sorusu net mi?
- Geri bildirim (feedback) anında ve açık mı?
- İlerleme hissi var mı?
- Prestij/yönetici gibi mekanikler yeterince tanıtılıyor mu?
- Sayılar/ödüller tatmin edici görünüyor mu?

### Hata Varsa Hemen Düzelt:
- Tespit edilen görsel/UX/mantık hatalarını analiz sonrası bekletme, direkt düzelt.
- Hem tasarımcı hem oyuncu perspektifinden çıkan sorunları listele ve fix et.

## Teknik Notlar
- Save key: `cosmicFactory_v5`
- Tab sistemi: `switchTab('biz'|'mgr'|'more')`
- Timer sistemi: AdCap tarzı — `timerProgress`, `timerRunning`, `lastTimerStart`
- Prestige L1 (DM), Ascension L2 (AP), Kozmik Kristal L3 (hiç sıfırlanmaz)
- `_raf` cache objesi renderUpgrades() diff-check için kullanılıyor
