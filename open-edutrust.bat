@echo off
cd /d "%~dp0"
echo Launching EduTrust AI...
start "EduTrust AI Dev Server" cmd /k "cd /d ""%~dp0"" && npm.cmd run dev"
timeout /t 4 /nobreak >nul
start "" "http://localhost:3000"
