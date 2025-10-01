@echo off
echo Building i-Protect APK...
echo.

echo Step 1: Installing dependencies...
call npm install

echo.
echo Step 2: Installing EAS CLI (if not already installed)...
call npm install -g @expo/eas-cli

echo.
echo Step 3: Building APK...
call eas build --platform android --profile preview --local

echo.
echo Build complete! Check the current directory for the APK file.
pause