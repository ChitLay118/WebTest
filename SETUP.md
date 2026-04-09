# ThaiMMPay Mobile App - Setup & Deployment Guide

## Overview

ThaiMMPay is a React Native mobile application for Thai-Myanmar money remittance with Firebase integration and push notifications. The app is built with Expo and supports both iOS and Android platforms.

---

## Project Structure

```
ThaiMMPay/
├── app/                          # Expo Router screens
│   ├── (tabs)/                   # Tab-based navigation
│   │   ├── home.tsx             # Home screen (exchange rates)
│   │   ├── transfer.tsx         # Transfer screen (bank/phone bill)
│   │   ├── inbox.tsx            # Inbox screen (notifications)
│   │   ├── profile.tsx          # Profile screen (user info)
│   │   └── _layout.tsx          # Tab navigation layout
│   └── _layout.tsx              # Root layout with providers
├── components/
│   ├── ui/                       # Reusable UI components
│   │   ├── glass-card.tsx       # Glass-morphism card
│   │   ├── gradient-button.tsx  # Emerald gradient button
│   │   ├── message-toast.tsx    # Toast notifications
│   │   ├── loading-overlay.tsx  # Loading spinner
│   │   └── image-lightbox.tsx   # Image modal viewer
│   └── screen-container.tsx     # SafeArea wrapper
├── lib/
│   ├── firebase.ts              # Firebase config & paths
│   ├── auth-context.tsx         # Firebase Auth provider
│   └── utils.ts                 # Utility functions (cn)
├── server/
│   └── services/
│       └── firebase-admin.ts    # Firebase Admin SDK for notifications
├── assets/images/               # App icons and branding
├── app.config.ts                # Expo configuration
├── theme.config.js              # Tailwind color tokens
├── tailwind.config.js           # Tailwind CSS config
└── package.json                 # Dependencies

```

---

## Prerequisites

- **Node.js** 22+ and **pnpm**
- **Firebase Project** (already configured with `thaimyanmarmoneytransfer`)
- **EAS Account** (for building APKs)
- **GitHub Account** (for CI/CD)

---

## Local Development

### 1. Install Dependencies

```bash
cd /home/ubuntu/ThaiMMPay
pnpm install
```

### 2. Start Dev Server

```bash
pnpm dev
```

This starts both the Metro bundler and backend server:
- **Metro (Web)**: http://localhost:8081
- **Expo Go QR**: `exps://8081-...` (scan with Expo Go on mobile)
- **Backend API**: http://localhost:3000

### 3. Test on Mobile

**Option A: Expo Go (Easiest)**
1. Install Expo Go on iOS/Android
2. Scan QR code from Metro output
3. App loads in Expo Go

**Option B: Development Build**
```bash
eas build --platform android --profile preview
```

---

## Firebase Configuration

### Exchange Rates (Firestore)

Path: `artifacts/thai-myanmar-remittance/public/data/rates/current`

```json
{
  "rateBuyMMK": 80,
  "rateBuyMMKPhone": 80,
  "lastUpdated": "2026-04-09T12:00:00Z"
}
```

### Bank Info (Firestore)

Path: `artifacts/thai-myanmar-remittance/public/data/config/bankInfo`

```json
{
  "image1URL": "https://...",
  "image2URL": "https://...",
  "image3URL": "https://...",
  "image4URL": "https://...",
  "wavePayURL": "https://...",
  "kpayURL": "https://..."
}
```

### Transfers (Firestore)

Path: `artifacts/thai-myanmar-remittance/public/data/transfers`

```json
{
  "senderId": "user-uid",
  "senderEmail": "user@example.com",
  "amountTHB": 1000,
  "amountMMK": 80000,
  "transferType": "account",
  "receiptImageURL": "https://...",
  "bankQrImageURL": "https://...",
  "status": "Pending",
  "timestamp": "2026-04-09T12:00:00Z",
  "senderName": "John Doe",
  "receiverName": "Jane Doe",
  "senderPhoneTH": "+66812345678",
  "receiverPhoneMM": "+95912345678",
  "phoneBillType": "MPT",
  "phoneBillNumber": "+95912345678",
  "transferAccountType": "WavePay"
}
```

### User Notifications (Firestore)

Path: `artifacts/thai-myanmar-remittance/users/{userId}/notifications`

```json
{
  "title": "Transfer Completed",
  "message": "Your transfer of 1000 THB has been completed",
  "imageURL": "https://...",
  "isRead": false,
  "timestamp": "2026-04-09T12:00:00Z"
}
```

---

## Sending Notifications

### Using Firebase Admin SDK (Backend)

```typescript
import { sendNotificationToUser } from "@/server/services/firebase-admin";

// Send notification to a user
await sendNotificationToUser(
  userId,
  "Transfer Completed",
  "Your transfer of 1000 THB has been completed",
  imageURL
);
```

### API Endpoint (Optional)

Create a tRPC endpoint to send notifications:

```typescript
// server/_core/router.ts
export const appRouter = router({
  notifications: {
    send: protectedProcedure
      .input(z.object({
        userId: z.string(),
        title: z.string(),
        message: z.string(),
        imageURL: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return sendNotificationToUser(
          input.userId,
          input.title,
          input.message,
          input.imageURL
        );
      }),
  },
});
```

---

## Building APK

### Option 1: GitHub Actions (Recommended)

1. **Set up EAS Token**:
   ```bash
   eas login
   eas secret create --scope project --name EAS_TOKEN
   ```

2. **Add to GitHub Secrets**:
   - Go to GitHub repo → Settings → Secrets
   - Add `EAS_TOKEN` with your EAS token

3. **Trigger Build**:
   ```bash
   git push origin main
   ```

4. **Download APK**:
   - GitHub Actions will build and upload APK to releases

### Option 2: Manual Build

```bash
eas build --platform android --non-interactive
```

### Option 3: Local Build (Not Recommended)

```bash
eas build --platform android --local
```

---

## App Configuration

### Update App Name/Package

Edit `app.config.ts`:

```typescript
const env = {
  appName: "ThaiMMPay",
  appSlug: "thaimmpay",
  logoUrl: "https://...",
  iosBundleId: "com.thaimmpay.wynex",
  androidPackage: "com.thaimmpay.wynex",
};
```

### Update App Icon

1. Generate icon: `pnpm generate-icon`
2. Place at `assets/images/icon.png` (1024x1024px)
3. Copies automatically to:
   - `splash-icon.png`
   - `favicon.png`
   - `android-icon-foreground.png`
   - `android-icon-background.png`
   - `android-icon-monochrome.png`

---

## Environment Variables

### Firebase Config

Already embedded in `lib/firebase.ts`. No additional setup needed.

### Backend Secrets

Create `.env.local`:

```bash
FIREBASE_ADMIN_SDK_KEY=<service-account-json>
```

---

## Deployment Checklist

- [ ] All screens functional (Home, Transfer, Inbox, Profile)
- [ ] Firebase Auth working (login/signup)
- [ ] Exchange rates updating from Firestore
- [ ] Transfer form submitting correctly
- [ ] Notifications displaying in Inbox
- [ ] App icon and branding updated
- [ ] GitHub Actions workflow configured
- [ ] EAS token added to GitHub Secrets
- [ ] APK builds successfully
- [ ] Tested on iOS and Android devices

---

## Troubleshooting

### Metro Bundler Crashes

```bash
# Clear cache and restart
pnpm dev --clear
```

### Firebase Auth Not Working

- Check Firebase config in `lib/firebase.ts`
- Verify Firestore security rules allow read/write
- Check browser console for errors

### Notifications Not Showing

- Verify user notifications collection exists in Firestore
- Check notification permissions on device
- Ensure FCM token is registered

### APK Build Fails

```bash
# Check EAS login
eas whoami

# View build logs
eas build --platform android --status
```

---

## Support

For issues or questions:
1. Check Firebase Console for errors
2. Review Firestore security rules
3. Check GitHub Actions logs for build failures
4. Consult Expo documentation: https://docs.expo.dev

---

## License

Private - ThaiMMPay Team

