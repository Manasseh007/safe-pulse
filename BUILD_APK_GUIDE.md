# How to Build APK for i-Protect App

## Method 1: Using Expo Build Service (Recommended)

1. **Install Expo CLI globally:**
```bash
npm install -g @expo/cli
```

2. **Login to Expo:**
```bash
expo login
```

3. **Build APK:**
```bash
expo build:android --type apk
```

## Method 2: Using EAS Build (New Expo Build System)

1. **Install EAS CLI:**
```bash
npm install -g @expo/eas-cli
```

2. **Configure EAS:**
```bash
eas build:configure
```

3. **Build APK:**
```bash
eas build --platform android --profile preview
```

## Method 3: Local Build (Requires Android Studio)

1. **Eject from Expo:**
```bash
expo eject
```

2. **Generate APK:**
```bash
cd android
./gradlew assembleRelease
```

The APK will be generated in: `android/app/build/outputs/apk/release/`

## Method 4: Online Build Services

- Use **Expo Snack** online
- Upload your project files
- Download APK directly

## Quick Start (Recommended)

Run this command in your project directory:
```bash
npx expo build:android --type apk
```

The build process will:
1. Upload your code to Expo servers
2. Build the APK
3. Provide download link when complete

## Notes

- Building requires an Expo account (free)
- Build time: 10-20 minutes
- APK size: ~25-50MB
- The APK will work on any Android device