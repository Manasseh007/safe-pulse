# Simple APK Build Instructions

Since EAS requires login, here are alternative methods:

## Method 1: Expo Snack (Online - No Setup Required)

1. Go to https://snack.expo.dev/
2. Create new project
3. Copy all files from `src/` folder to Snack
4. Copy `App.js` and `package.json` content
5. Click "Export" → "Download APK"

## Method 2: Manual Build Steps

1. **Create Expo account**: https://expo.dev/signup
2. **Login via command line**:
   ```bash
   npx eas-cli login
   ```
3. **Build APK**:
   ```bash
   npx eas-cli build --platform android --profile preview
   ```

## Method 3: Use Expo Go App (Testing)

1. Install "Expo Go" from Play Store
2. Run: `npm start`
3. Scan QR code with Expo Go
4. Test app directly on phone

## Method 4: Online Build Services

- **AppGyver**: Free APK builds
- **Ionic Appflow**: Free tier available
- **PhoneGap Build**: Adobe service

## Quick Test (Recommended)

For immediate testing:
1. Install Expo Go on your phone
2. Run `npm start` in project folder
3. Scan QR code to test app

The APK build requires an Expo account and takes 10-15 minutes to complete.