# How to Run i-Protect App

## Web Version (Recommended)
```bash
npm run web
```
Opens at http://localhost:19006

## Mobile Testing (No Android Studio needed)
1. Install "Expo Go" app on your phone
2. Run: `npm start`
3. Scan QR code with Expo Go app

## Build APK
```bash
npx eas-cli login
npx eas-cli build --platform android --profile preview
```

## Troubleshooting
- If ports are busy, kill processes: `taskkill /F /IM node.exe`
- For cache issues: `npx expo start --clear`
- For offline mode: `npx expo start --offline`