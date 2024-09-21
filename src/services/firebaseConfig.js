import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB2GMwvr2_JjviXzl-ou8Uw5Ii-3zDPpk4",
  authDomain: "travel-advisor-712c6.firebaseapp.com",
  projectId: "travel-advisor-712c6",
  storageBucket: "travel-advisor-712c6.appspot.com",
  messagingSenderId: "79057302573",
  appId: "1:79057302573:web:60192274b500954545b4a4",
  measurementId: "G-ML9TL46NYF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const storage = getStorage(app);

export { db, auth, provider };