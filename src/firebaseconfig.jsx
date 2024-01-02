// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBty3FHsYA_HfIqSerBBCNhaPyp-BM9Ns",
  authDomain: "question-and-article.firebaseapp.com",
  projectId: "question-and-article",
  storageBucket: "question-and-article.appspot.com",
  messagingSenderId: "473016013222",
  appId: "1:473016013222:web:a097807bf2972dc77eff67",
  measurementId: "G-62Q92WHGSS",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);
