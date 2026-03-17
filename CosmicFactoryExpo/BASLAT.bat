@echo off
title Cosmic Factory — Expo Baslatiyor...
color 0A

echo.
echo  ===================================
echo   COSMIC FACTORY EXPO KURULUM
echo   (SDK 54 / React Native 0.81)
echo  ===================================
echo.

cd /d "%~dp0"
echo [Klasor] %CD%
echo.

powershell -Command "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force" >nul 2>&1

echo [1/3] Eski paketler temizleniyor...
rmdir /s /q node_modules 2>nul
del package-lock.json 2>nul
echo Temizlendi.
echo.

echo [2/3] Paketler yukleniyor (3-5 dk surebilir)...
call npm install --legacy-peer-deps
echo.

echo [3/3] Expo baslatiliyor...
echo.
echo  *** QR kod cikinca telefonunla tara ***
echo  *** iPhone: Expo Go uygulamasi      ***
echo  *** Android: Expo Go uygulamasi     ***
echo.

call npx expo start --tunnel --clear

pause
