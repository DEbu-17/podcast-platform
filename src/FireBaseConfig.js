// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApXlU6FCm8lbDPKdrPDiLCpGmBTozTwIk",
  authDomain: "podcast-platform-412ca.firebaseapp.com",
  projectId: "podcast-platform-412ca",
  storageBucket: "podcast-platform-412ca.appspot.com",
  messagingSenderId: "230644826789",
  appId: "1:230644826789:web:460d715b6b6ad7f5fd834c",
  measurementId: "G-NNH8WXWRX9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth,db,storage};


