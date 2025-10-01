@echo off
echo Converting to React Native CLI build...

echo Step 1: Ejecting from Expo
call npx expo eject

echo Step 2: Building APK
cd android
call gradlew assembleRelease

echo APK location: android\app\build\outputs\apk\release\app-release.apk
pause