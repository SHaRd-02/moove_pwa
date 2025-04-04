// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR6xXBhiIeH00S59-27zJsmcOLIt9JCWQ",
  authDomain: "mooove-pwa.firebaseapp.com",
  projectId: "mooove-pwa",
  storageBucket: "mooove-pwa.firebasestorage.app",
  messagingSenderId: "67182474532",
  appId: "1:67182474532:web:de9f1b7cd67d23a8b46fb1"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
console.log('firebase init')
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);