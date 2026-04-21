import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔥 Firebase config (console theke copy kora)
const firebaseConfig = {
  apiKey: "AIzaSyBt4QkM-UajSWG0NkIXEgsH1rlBxFJCMv0",
  authDomain: "gub-bank.firebaseapp.com",
  databaseURL: "https://gub-bank-default-rtdb.firebaseio.com",
  projectId: "gub-bank",
  storageBucket: "gub-bank.firebasestorage.app",
  messagingSenderId: "886269428525",
  appId: "1:886269428525:web:dc5e1d82aabddeea0ac9a4",
  measurementId: "G-2Q06Z1SM74"
};
// Initialize
const app = initializeApp(firebaseConfig);

// 🔥 EXPORTS (VERY IMPORTANT)
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);   // 🔥 EI LINE TA MUST