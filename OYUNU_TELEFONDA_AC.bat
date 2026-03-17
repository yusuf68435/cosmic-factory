@echo off
title Cosmic Factory - Web Sunucusu
color 0B

echo.
echo  ==========================================
echo   COSMIC FACTORY - TELEFONDA AC
echo  ==========================================
echo.

cd /d "%~dp0"

:: Node.js kontrol
where node >nul 2>&1
if errorlevel 1 (
    echo [HATA] Node.js bulunamadi!
    echo Node.js indirmek icin: https://nodejs.org
    pause
    exit /b
)

:: Bilgisayarin yerel IP adresini bul
echo [1/2] Yerel IP adresi tespit ediliyor...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    set RAW_IP=%%a
    goto :found_ip
)
:found_ip
set LOCAL_IP=%RAW_IP: =%

echo.
echo  ==========================================
echo   SUNUCU BASLATILDI!
echo  ==========================================
echo.
echo   Bilgisayar adresi: http://%LOCAL_IP%:3000
echo.
echo   ADIMLAR:
echo   1. Telefonunu bu bilgisayarla AYNI WIFI'a bag
echo   2. iPhone Safari'yi ac
echo   3. Adres cubuguna yaz: %LOCAL_IP%:3000
echo   4. Enjoy!
echo.
echo   (Bu pencereyi kapatirsak oyun durur)
echo  ==========================================
echo.

:: Basit Node.js web sunucusu baslat
node -e "const http=require('http'),fs=require('fs'),path=require('path');const server=http.createServer((req,res)=>{const file=path.join(__dirname,'cosmic_factory.html');fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);res.end('Dosya bulunamadi')}else{res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(data)}})});server.listen(3000,'0.0.0.0',()=>{console.log('Sunucu calisiyor: http://0.0.0.0:3000')});"

pause
