// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: process.env.NEXT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.NEXT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.NEXT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.NEXT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_APP_FIREBASE_APP_ID,
  // measurementId: process.env.NEXT_APP_FIREBASE_MEASUREMENT_ID,
  apiKey: "AIzaSyCwj4gepWLCZSdd63u9F7YAkaVVxG2S_iA",
  authDomain: "cfs-camera.firebaseapp.com",
  projectId: "cfs-camera",
  storageBucket: "cfs-camera.appspot.com",
  messagingSenderId: "818345072663",
  appId: "1:818345072663:web:6ece32a89692f556632452",
  measurementId: "G-LBCKN5DEWS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const db = getFirestore(app);
export { db };
