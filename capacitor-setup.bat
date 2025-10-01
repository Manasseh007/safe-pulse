@echo off
echo Setting up Capacitor build...

echo Step 1: Install Capacitor
call npm install @capacitor/core @capacitor/cli @capacitor/android

echo Step 2: Initialize Capacitor
call npx cap init "i-Protect" "com.iprotect.app"

echo Step 3: Build web assets
call npm run build

echo Step 4: Add Android platform
call npx cap add android

echo Step 5: Copy assets
call npx cap copy

echo Step 6: Open in Android Studio
call npx cap open android

echo Now build APK from Android Studio: Build > Build Bundle(s)/APK(s) > Build APK(s)
pause