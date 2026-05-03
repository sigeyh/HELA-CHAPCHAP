import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyACmo5asSSo-hVfVaxNOHhQ25cqByYYPeU",
  authDomain: "hela-pesa-641b4.firebaseapp.com",
  projectId: "hela-pesa-641b4",
  storageBucket: "hela-pesa-641b4.firebasestorage.app",
  messagingSenderId: "67716565239",
  appId: "1:67716565239:web:373293f9a5ce2fb67dabf2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
