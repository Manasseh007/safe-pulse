@echo off
echo Building with Cordova...

echo Step 1: Install Cordova
call npm install -g cordova

echo Step 2: Create Cordova project
call cordova create iprotect-cordova com.iprotect.app "i-Protect"
cd iprotect-cordova

echo Step 3: Add Android platform
call cordova platform add android

echo Step 4: Build APK
call cordova build android

echo APK location: platforms\android\app\build\outputs\apk\debug\app-debug.apk
pause