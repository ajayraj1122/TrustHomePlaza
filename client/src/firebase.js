// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "comfort-cove-72f9c.firebaseapp.com",
  projectId: "comfort-cove-72f9c",
  storageBucket: "comfort-cove-72f9c.appspot.com",
  messagingSenderId: "989888314072",
  appId: "1:989888314072:web:d60ca248e8aebd3cd0b5ad"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);