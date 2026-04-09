# ThaiMMPay Mobile App Design

## Overview
ThaiMMPay is a remittance application enabling Thai-Myanmar money transfers with real-time exchange rates, multiple payment methods, and push notifications. The app follows **iOS Human Interface Guidelines** for a native-like experience optimized for portrait orientation (9:16) and one-handed usage.

---

## Screen List

### 1. **Authentication Screens**
- **Login Screen**: Email and password input with sign-in button
- **Sign Up Screen**: Name, email, password input with account creation
- **Forgot Password** (optional): Email recovery flow

### 2. **Main App Screens** (Tab-based Navigation)
- **Home Screen** (Primary): Live exchange rates, payment account QR codes
- **Transfer Screen**: Money transfer form (Bank Transfer or Phone Bill)
- **Inbox Screen**: Push notifications and messages from admin
- **Profile Screen**: User info, transfer history, logout

---

## Screen Details & Primary Content

### Home Screen
**Purpose**: Display current exchange rates and payment methods at a glance

**Content**:
- Header: "ယနေ့ငွေလဲနှုန်း" (Today's Exchange Rates)
- Live badge with last update timestamp
- Two rate cards:
  - Bank Transfer: THB to MMK conversion (e.g., 100,000 MMK = X THB)
  - Phone Bill: Fixed 10,000 MMK rate
- Payment Account Section: Grid of 4 QR code images (WavePay, KPay, etc.)
- Tap QR to view full image in lightbox

**Functionality**:
- Real-time rate updates from Firestore
- Clickable QR codes for enlargement
- Smooth animations on load

---

### Transfer Screen
**Purpose**: Allow users to initiate money transfers

**Content**:
- Tab selector: BANK | BILL
- **Bank Transfer Tab**:
  - Payment method selector (WavePay / KPay with logos)
  - Sender name input
  - Receiver name input
  - Sender phone (Thailand)
  - Receiver phone (Myanmar)
  - Receiver bank QR upload
  - Amount input (THB)
  - Receipt image upload
  - Submit button: "ငွေလွှဲတောင်းဆိုမည်"

- **Phone Bill Tab**:
  - SIM network selector (ATOM, MPT, Mytel, U9)
  - Phone number input
  - Amount input (THB)
  - Receipt image upload
  - Submit button

**Functionality**:
- Form validation before submission
- Image upload to Cloudinary
- Automatic MMK calculation based on selected rate
- Loading overlay during submission
- Success/error toast messages

---

### Inbox Screen
**Purpose**: Display push notifications and messages from admin

**Content**:
- List of notifications with:
  - Title
  - Message body
  - Timestamp
  - Optional image attachment
  - Unread indicator (green dot)
- Empty state: "မက်ဆေ့ခ်ျမရှိသေးပါ" (No messages yet)

**Functionality**:
- Tap notification to mark as read
- Unread badge on tab bar (red dot)
- Click image to view in lightbox
- Real-time updates from Firestore

---

### Profile Screen
**Purpose**: Show user account info and transfer history

**Content**:
- User avatar (icon placeholder)
- Display name
- Email address
- Statistics:
  - Total transfers count
  - Completed transfers count
- User ID
- Join date
- Transfer History:
  - List of past transfers with:
    - Amount (THB → MMK)
    - Date
    - Status badge (Pending / Completed)
- Logout button (red/warning style)

**Functionality**:
- Display user metadata from Firebase Auth
- Load transfer history from Firestore
- Logout clears session
- Tap transfer to view details (optional)

---

## Key User Flows

### Flow 1: User Login & Home
1. User enters email and password on Auth Screen
2. Firebase authenticates credentials
3. App shows Home Screen with live rates
4. User can tap QR codes to view full images

### Flow 2: Bank Transfer
1. User taps Transfer tab → Bank Transfer tab selected
2. Selects payment method (WavePay or KPay)
3. Fills sender/receiver names and phone numbers
4. Uploads receiver's bank QR image
5. Enters amount in THB
6. Uploads payment receipt image
7. Taps submit button
8. Loading overlay appears
9. On success: Toast message + redirect to Home
10. Transfer appears in Profile screen with "Pending" status

### Flow 3: Phone Bill Transfer
1. User taps Transfer tab → Bill tab selected
2. Selects SIM network (ATOM, MPT, Mytel, U9)
3. Enters phone number to top up
4. Enters amount in THB
5. Uploads payment receipt image
6. Taps submit button
7. Loading overlay appears
8. On success: Toast message + redirect to Home

### Flow 4: Receive Push Notification
1. Admin sends notification via Firebase Admin SDK
2. Notification arrives on user's device
3. User taps notification → opens Inbox
4. Notification marked as read
5. Unread badge disappears from tab bar

### Flow 5: View Transfer History
1. User taps Profile tab
2. Scrolls down to see all past transfers
3. Each transfer shows amount, date, and status
4. Completed transfers show green badge
5. Pending transfers show amber badge

---

## Color Choices

**ThaiMMPay Brand Colors** (Emerald Green + Dark Slate):

| Element | Color | Hex | Usage |
|---------|-------|-----|-------|
| Primary | Emerald Green | #10b981 | Buttons, active states, accents |
| Primary Dark | Dark Emerald | #059669 | Button hover, gradients |
| Background | Dark Slate | #0f172a | Screen background |
| Surface | Card Background | #1e293b (70% opacity) | Cards, inputs |
| Text Primary | Light Slate | #f1f5f9 | Main text |
| Text Secondary | Muted Slate | #94a3b8 | Secondary text |
| Border | White 10% | rgba(255,255,255,0.1) | Dividers, borders |
| Success | Emerald | #22c55e | Success messages |
| Error | Rose | #ef4444 | Error messages |
| Warning | Amber | #f59e0b | Pending status |

**Gradient**: Linear gradient from #1e293b (top-right) to #0f172a (bottom-left) for depth

---

## Typography

- **Font Family**: Inter (primary), Padauk (Myanmar text)
- **Heading**: Bold, 24-28px
- **Body**: Regular, 14-16px
- **Caption**: 10-12px, muted color
- **Button**: Bold, 14-16px

---

## Navigation Structure

```
Root
├── Auth Stack (when logged out)
│   ├── Login Screen
│   └── Sign Up Screen
└── Main Tabs (when logged in)
    ├── Home (house icon)
    ├── Transfer (plus circle icon)
    ├── Inbox (bell icon, with badge)
    └── Profile (user circle icon)
```

---

## Design System Notes

- **Spacing**: 4px grid (4, 8, 12, 16, 20, 24, 32px)
- **Border Radius**: 12px (cards), 24px (buttons), 8px (inputs)
- **Shadows**: Subtle (0 10px 30px -5px rgba(0,0,0,0.3))
- **Animations**: Smooth transitions (300ms), no excessive bouncing
- **Safe Area**: Respects notch on iPhone X+, home indicator on bottom
- **Tab Bar**: Fixed at bottom with 4 icons, glass-morphism effect
- **Modals**: Full-screen lightbox for images, centered toast for messages

---

## Accessibility Considerations

- All interactive elements have minimum 44x44pt touch target
- Color contrast meets WCAG AA standards
- Text sizes remain readable (minimum 12pt)
- Loading states clearly indicate progress
- Error messages are specific and actionable

