# ADB Setup for i-Protect App

## Install Android SDK

### Option 1: Android Studio (Recommended)
1. Download Android Studio: https://developer.android.com/studio
2. Install with default settings
3. Open Android Studio → SDK Manager → Install latest SDK

### Option 2: Command Line Tools Only
1. Download SDK Command Line Tools: https://developer.android.com/studio#command-tools
2. Extract to `C:\Android\cmdline-tools\latest\`
3. Install SDK: `sdkmanager "platform-tools" "platforms;android-33"`

## Set Environment Variables
```cmd
setx ANDROID_HOME "C:\Users\%USERNAME%\AppData\Local\Android\Sdk"
setx PATH "%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools"
```

## Enable USB Debugging
1. On your Android device: Settings → About Phone
2. Tap "Build Number" 7 times to enable Developer Options
3. Settings → Developer Options → Enable "USB Debugging"

## Test ADB Connection
```cmd
adb devices
```

## Run App on Device
```cmd
npm run android
```

## ADB Commands for Development
```cmd
adb logcat                    # View device logs
adb install app.apk          # Install APK
adb uninstall com.package    # Uninstall app
adb shell                    # Access device shell
```