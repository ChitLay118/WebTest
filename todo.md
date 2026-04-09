# ThaiMMPay Project TODO

## Phase 1: Core Mobile App Structure
- [ ] Convert HTML layout to React Native tab navigation (Home, Transfer, Inbox, Profile)
- [ ] Implement ScreenContainer for all screens with proper SafeArea handling
- [ ] Set up NativeWind Tailwind styling with ThaiMMPay brand colors (emerald green + dark slate)
- [ ] Create reusable UI components (GlassCard, Button, Input, Badge)

## Phase 2: Authentication
- [ ] Implement Firebase Authentication integration
- [ ] Create Login screen with email/password form
- [ ] Create Sign Up screen with name/email/password form
- [ ] Add auth state persistence (check login on app start)
- [ ] Implement logout functionality
- [ ] Add loading overlay during auth operations
- [ ] Add error/success toast messages

## Phase 3: Home Screen
- [ ] Display live exchange rates from Firestore (THB to MMK)
- [ ] Show rate update timestamp
- [ ] Create rate cards for Bank Transfer and Phone Bill
- [ ] Display 4 payment account QR codes in grid
- [ ] Implement image lightbox modal for QR code viewing
- [ ] Add real-time Firestore listener for rate updates

## Phase 4: Transfer Screen
- [ ] Create tab selector (BANK | BILL)
- [ ] **Bank Transfer Tab**:
  - [ ] Payment method selector (WavePay / KPay)
  - [ ] Sender/receiver name inputs
  - [ ] Phone number inputs (Thailand/Myanmar)
  - [ ] Bank QR image upload
  - [ ] Amount input with validation
  - [ ] Receipt image upload
  - [ ] Form submission with Cloudinary upload
  - [ ] Firestore document creation
- [ ] **Phone Bill Tab**:
  - [ ] SIM network selector (ATOM, MPT, Mytel, U9)
  - [ ] Phone number input
  - [ ] Amount input with validation
  - [ ] Receipt image upload
  - [ ] Form submission
- [ ] Automatic MMK calculation based on rate
- [ ] Loading overlay during submission
- [ ] Success/error messages

## Phase 5: Inbox Screen (Push Notifications)
- [ ] Set up Firebase Cloud Messaging (FCM) token registration
- [ ] Request notification permissions on app launch
- [ ] Create notification handler for foreground/background
- [ ] Display notifications as list items with:
  - [ ] Title, message, timestamp
  - [ ] Optional image attachment
  - [ ] Unread indicator (green dot)
- [ ] Implement mark-as-read functionality
- [ ] Show unread badge on Inbox tab bar icon
- [ ] Real-time Firestore listener for user notifications
- [ ] Empty state message

## Phase 6: Profile Screen
- [ ] Display user avatar (icon placeholder)
- [ ] Show user display name and email
- [ ] Display statistics (total transfers, completed transfers)
- [ ] Show user ID and join date
- [ ] Load transfer history from Firestore
- [ ] Display transfer list with:
  - [ ] Amount (THB → MMK)
  - [ ] Date
  - [ ] Status badge (Pending/Completed)
- [ ] Implement logout button
- [ ] Add logout confirmation

## Phase 7: Firebase Integration
- [ ] Configure Firebase config in app
- [ ] Set up Firestore security rules
- [ ] Create data structure for:
  - [ ] Exchange rates (public/data/rates)
  - [ ] Bank info (public/data/config/bankInfo)
  - [ ] Transfers (public/data/transfers)
  - [ ] User notifications (users/{userId}/notifications)
- [ ] Implement real-time listeners for all data

## Phase 8: Push Notifications Backend
- [ ] Create backend service with Firebase Admin SDK
- [ ] Implement endpoint to send notifications to users
- [ ] Store Firebase Service Account credentials securely
- [ ] Create admin panel/script to send notifications
- [ ] Test notification delivery to multiple devices

## Phase 9: Branding & Assets
- [ ] Generate custom app logo (ThaiMMPay brand)
- [ ] Create icon.png, splash-icon.png, favicon.png
- [ ] Create Android adaptive icon (foreground, background, monochrome)
- [ ] Update app.config.ts with:
  - [ ] appName: "ThaiMMPay"
  - [ ] appSlug: "thaimmpay"
  - [ ] logoUrl (S3 URL from generated logo)
  - [ ] Android package: "com.thaimmpay.wynex"

## Phase 10: GitHub Actions & Automated Builds
- [ ] Set up GitHub Actions workflow for APK builds
- [ ] Configure EAS Build integration
- [ ] Create workflow file (.github/workflows/build-apk.yml)
- [ ] Test automated APK generation on push
- [ ] Set up artifact storage/release

## Phase 11: Testing & Optimization
- [ ] Test all screens on iOS and Android
- [ ] Verify Firebase integration works correctly
- [ ] Test push notification delivery
- [ ] Verify image uploads to Cloudinary
- [ ] Test form validations
- [ ] Performance optimization (lazy loading, memoization)
- [ ] Verify dark mode support

## Phase 12: Deployment
- [ ] Create final checkpoint
- [ ] Push all code to GitHub repository
- [ ] Verify GitHub Actions builds successfully
- [ ] Generate APK via GitHub Actions
- [ ] Provide user with build instructions

