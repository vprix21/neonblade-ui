import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export function getAdminDb() {
  if (!getApps().length) {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!raw) {
      throw new Error(
        "Missing env var: FIREBASE_SERVICE_ACCOUNT_KEY. See .env.example.",
      );
    }
    const serviceAccount = JSON.parse(raw);
    initializeApp({
      credential: cert(serviceAccount),
    });
  }
  return getFirestore();
}
