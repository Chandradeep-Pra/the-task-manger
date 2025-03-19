// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPA2I8Wd3Ab6njQ17UY2ViCXWUJ2ogEsI",
  authDomain: "taskbuddy-fe6b5.firebaseapp.com",
  projectId: "taskbuddy-fe6b5",
  storageBucket: "taskbuddy-fe6b5.firebasestorage.app",
  messagingSenderId: "142691476808",
  appId: "1:142691476808:web:a1b24b629bda19aada3f7d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const storage = getStorage(app);
export const db = getFirestore(app);
