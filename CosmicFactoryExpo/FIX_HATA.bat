@echo off
echo ========================================
echo   Expo Cache Temizleyici - Fix Script
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] Metro cache temizleniyor...
npx expo start --clear --port 8081
echo.

echo Eger hata devam ederse asagidaki adimlari dene:
echo  1. Telefondaki Expo Go uygulamasini guncelle (App Store)
echo  2. Expo Go'yu tamamen kapat ve yeniden ac
echo  3. Bu scripti tekrar calistir
echo.
pause
