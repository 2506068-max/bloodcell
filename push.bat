@echo off
title Push ke GitHub - 2506068-max/bloodcell
color 0b
echo ===================================================
echo   PUSH KE GITHUB: 2506068-max/bloodcell
echo ===================================================
echo.
cd /d "D:\BLOOD CELL"
echo Menjalankan: npm run build...
call npm run build
echo.
echo Menambahkan berkas ke git...
git add .
echo Membuat commit...
git commit -m "Update visual anatomi medis realistis, histologi, dan mikroskopi"
echo.
echo Menjalankan: git push origin main...
git push origin main
echo.
echo ===================================================
if %ERRORLEVEL% equ 0 (
    color 0a
    echo [SUKSES] Seluruh pembaruan berhasil di-push ke GitHub!
) else (
    color 0c
    echo [GAGAL / BUTUH LOGIN] Periksa pesan di atas.
)
echo ===================================================
echo.
pause
