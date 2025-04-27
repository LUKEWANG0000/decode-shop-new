@echo off
cd /d %~dp0
git add .
git commit -m "auto deploy"
git push -u origin main
pause
