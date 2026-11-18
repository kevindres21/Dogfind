import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAxxDiSAS0d-z-DnZsEtgN9L-Jc1VkjdyI",
  authDomain: "dogfind-7f5ae.firebaseapp.com",
  projectId: "dogfind-7f5ae",
  storageBucket: "dogfind-7f5ae.firebasestorage.app",
  messagingSenderId: "192601467506",
  appId: "1:192601467506:web:1cfc32e5a12eea353b30eb",
  measurementId: "G-N2NKVRBVVK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };