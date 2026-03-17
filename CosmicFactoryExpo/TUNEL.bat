@echo off
title Cosmic Factory — Tunel Modu
color 0B

echo.
echo  ===================================
echo   COSMIC FACTORY — TUNEL MODU
echo   (SDK 54 / React Native 0.81)
echo  ===================================
echo.

cd /d "%~dp0"

powershell -Command "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force" >nul 2>&1

echo Paketler yukleniyor...
call npm install --legacy-peer-deps
echo.

echo Tunel baslatiliyor...
echo.
echo  *** Mobil veriyle de calisir! ***
echo.

call npx expo start --tunnel --clear

pause
