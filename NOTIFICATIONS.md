# Notifications setup (Notifee + Android)

This project now attempts to display system notifications via `@notifee/react-native` when available. Follow the steps below to make notifications show in the top notification bar (heads-up) on Android.

1) Install Notifee (native module)

- Yarn:

```bash
yarn add @notifee/react-native
```

- NPM:

```bash
npm install @notifee/react-native
```

- iOS (if used):

```bash
cd ios && pod install && cd ..
```

2) Rebuild the app (native changes required)

```bash
npx react-native run-android
# or
npx react-native run-ios
```

3) Add Android notification icon resources

Android notifications require a small monochrome icon resource. The service uses the resource name `ic_stat_notify`.

Place PNG variants in the appropriate drawable folders under your Android app:

- `android/app/src/main/res/drawable-mdpi/ic_stat_notify.png`
- `android/app/src/main/res/drawable-hdpi/ic_stat_notify.png`
- `android/app/src/main/res/drawable-xhdpi/ic_stat_notify.png`
- `android/app/src/main/res/drawable-xxhdpi/ic_stat_notify.png`
- `android/app/src/main/res/drawable-xxxhdpi/ic_stat_notify.png`

Icon requirements:
- Solid white (single-color) icon with a transparent background is recommended for Android notification small icons.
- Typically 24x24 dp; create PNGs for the density buckets above.

Alternative: Use your existing launcher icon name (e.g. `ic_launcher`) if you don't want to add new images — update `src/services/PushNotifications.js` to use that name.

4) Channel importance and heads-up behavior

The code creates (via Notifee) a channel with `AndroidImportance.HIGH`. High importance channels produce heads-up (top-of-screen) notifications on most devices. If you don't see heads-up notifications, ensure:

- Channel exists and has HIGH importance
- App has notification permission (iOS/iOS-like behavior) and Android's Do Not Disturb isn't blocking

5) Testing

- Use Firebase Console > Cloud Messaging to send a test notification (include `notification.title` and `notification.body`) to your device.
- Or use your server API that calls FCM; ensure the message contains a `notification` payload or send a data-only message and let the app display it via the background handler.

6) Troubleshooting

- If Notifee isn't installed, the code falls back to `Alert` — you'll see popup dialogs instead of system notifications.
- If you get `Requiring unknown module "undefined"` restart Metro and reinstall node modules:

```bash
rm -rf node_modules && yarn && npx react-native start --reset-cache
```

- After native installs always rebuild the app (`run-android` / `run-ios`).

7) Next improvements (optional)

- Add the PNG icon files to the repo under `android/app/src/main/res/...` if you want me to add example images.
- Replace fallback `Alert` with richer local notification handling for iOS.

If you'd like, I can add example PNGs (simple placeholders) into the repo and wire them into the Android resources — do you want me to add placeholder icons now?