// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtnJgg4jJ9i7Z3sRf7_VaAhbQXNHritZI",
  authDomain: "mpss-77ade.firebaseapp.com",
  projectId: "mpss-77ade",
  storageBucket: "mpss-77ade.appspot.com",
  messagingSenderId: "909586495346",
  appId: "1:909586495346:web:775606f68863f5b4af4feb",
  measurementId: "G-JR6MJB4WMZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db, firebaseConfig };
