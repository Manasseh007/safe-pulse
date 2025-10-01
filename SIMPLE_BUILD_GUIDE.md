# Simple APK Build Guide for i-Protect

## Option 1: Using Expo Go (Quickest)
1. Install Expo Go app on your Android device from Play Store
2. Run: `npm start`
3. Scan QR code with Expo Go app

## Option 2: Build APK with EAS (Recommended)
1. Create Expo account at https://expo.dev
2. Login: `npx eas-cli login`
3. Build APK: `npx eas-cli build --platform android --profile preview`

## Option 3: Local Development Build
1. Install Android Studio and setup ADB
2. Connect Android device with USB debugging enabled
3. Run: `npm run android`

## Option 4: Web Version (Testing)
1. Run: `npm run web`
2. Open http://localhost:3000 in browser

## Troubleshooting
- If build fails, try: `npm install` then retry
- For permission issues, run as administrator
- Ensure Android SDK is properly installed

## Current Status
- Dependencies: ✅ Installed
- Location permissions: ✅ Added
- API endpoints: ✅ Fixed
- Input validation: ✅ Added