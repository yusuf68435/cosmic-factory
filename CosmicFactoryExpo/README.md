# 🚀 Cosmic Factory — Expo

## Kurulum (sadece 1 kez)

```bash
cd CosmicFactoryExpo
npm install
```

## Çalıştırma

### 📱 Normal (aynı Wi-Fi'de telefon):
```bash
npm start
```
- Terminalde QR kodu çıkar
- Telefona **Expo Go** uygulamasını yükle
- QR'ı kameranla tara → oyun açılır

### 🌍 Tunnel (farklı ağda, her yerden):
```bash
npm run tunnel
```
- Expo tunnel QR'ı oluşturur (ngrok üzerinden)
- Farklı ağdayken bile çalışır

### 🤖 Direkt Android:
```bash
npm run android
```

### 🍎 Direkt iOS Simulator:
```bash
npm run ios
```

## Gereksinimler
- Node.js 18+
- **Expo Go** uygulaması (App Store / Play Store'dan ücretsiz)
- Tunnel için: `npm install -g @expo/ngrok` (opsiyonel)

## Notlar
- Oyun kayıtları telefon depolamasına (localStorage) kaydedilir
- Dark Matter, prestige, tüm özellikler tam çalışır
