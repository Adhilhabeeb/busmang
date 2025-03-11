import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider, signInWithPopup} from "firebase/auth";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyC6p7iusxwXj9SL3xhsakcRraqyxFk8GcI",
    authDomain: "boatproj-fa315.firebaseapp.com",
    projectId: "boatproj-fa315",
    storageBucket: "boatproj-fa315.firebasestorage.app",
    messagingSenderId: "746404835897",
    appId: "1:746404835897:web:b9510b774f8459f06713e8",
    measurementId: "G-23KXFMSG9K"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);

 let  auth =getAuth(app)
 const provider = new GoogleAuthProvider();
  const db = getFirestore(app);
// export const db = getFirestore(app);
export { auth, provider, signInWithPopup,db };

// Import the functions you need from the SDKs you need
