import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // for authentication
import { getStorage } from "firebase/storage"; // for storage
import { getFirestore } from "firebase/firestore"; // for cloud firestore

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1IsOyhqt4awp7rARasfTYKd4S7BnHZLs",
  authDomain: "dughub-5d65a.firebaseapp.com",
  projectId: "dughub-5d65a",
  storageBucket: "dughub-5d65a.firebasestorage.app",
  messagingSenderId: "527491676744",
  appId: "1:527491676744:web:6be690597c4c71c8ca767d",
  measurementId: "G-NKV31FKP2L",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };
