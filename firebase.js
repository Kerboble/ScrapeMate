
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCycUjD4iL8h6t2l8kwyI6OZDEj0zYXtmw",
  authDomain: "scrapemate-86018.firebaseapp.com",
  projectId: "scrapemate-86018",
  storageBucket: "scrapemate-86018.appspot.com",
  messagingSenderId: "528417579065",
  appId: "1:528417579065:web:efaf9dae80133ec2baade8",
  measurementId: "G-LJCBBYFY4L"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app)
