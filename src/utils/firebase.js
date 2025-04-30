// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByN4xg_nmdUHFJm5IkivRa9nu_5ubjG1I",
  authDomain: "cineverse-78b84.firebaseapp.com",
  projectId: "cineverse-78b84",
  storageBucket: "cineverse-78b84.firebasestorage.app",
  messagingSenderId: "218136113671",
  appId: "1:218136113671:web:ec527919867556ed8770a2",
  measurementId: "G-GJT8GKWBYD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();