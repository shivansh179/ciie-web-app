// lib/firebaseConfig.js
// import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from '@firebase/auth';
// import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDJwi2cA14hXV0t9T-p1gOHGdx4RXORmBE",
  authDomain: "ciie-practice.firebaseapp.com",
  projectId: "ciie-practice",
  storageBucket: "ciie-practice.appspot.com",
  messagingSenderId: "953362043699",
  appId: "1:953362043699:web:396d3d6246c03ecf806446"
};

// Check if any Firebase apps have been initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
