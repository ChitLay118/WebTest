import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBP6_0BX2UVepRHwof51jeO7k3s9yaRFaY",
  authDomain: "thaimyanmarmoneytransfer.firebaseapp.com",
  projectId: "thaimyanmarmoneytransfer",
  storageBucket: "thaimyanmarmoneytransfer.firebasestorage.app",
  messagingSenderId: "611201356727",
  appId: "1:611201356727:web:8b1f96b45c8ce45ba34e32",
  measurementId: "G-BPSKQW1QFH",
};

// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIG);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize messaging for web (if available)
let messaging: any = null;
if (typeof window !== "undefined") {
  try {
    messaging = getMessaging(app);
  } catch (error) {
    console.log("Messaging not available on this platform");
  }
}

export { messaging };

// Firestore paths
export const APP_ID = "thai-myanmar-remittance";
export const PUBLIC_DATA_PATH = `artifacts/${APP_ID}/public/data`;

export function getUserNotificationsPath(userId: string) {
  return `artifacts/${APP_ID}/users/${userId}`;
}
