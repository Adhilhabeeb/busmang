import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider, signInWithPopup} from "firebase/auth";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBUrkc0Ajnqay2mFE1PCPpVNxFrRKh6WO8",
  authDomain: "busticket-7e120.firebaseapp.com",
  projectId: "busticket-7e120",
  storageBucket: "busticket-7e120.firebasestorage.app",
  messagingSenderId: "255176226549",
  appId: "1:255176226549:web:286beb9ca2cf8c4e9ef7bc",
  measurementId: "G-4LJMS4GD6T"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

 let  auth =getAuth(app)
 const provider = new GoogleAuthProvider();
  const db = getFirestore(app);
// export const db = getFirestore(app);
export { auth, provider, signInWithPopup,db };

// Import the functions you need from the SDKs you need
