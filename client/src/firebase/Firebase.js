// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Firebase Auth imports
import {
    getAuth,
    GoogleAuthProvider,
    signInWithRedirect,
    signOut
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAibwGylKMWMZc04UJtWspUFPxYyKUYPU",
    authDomain: "art-core-02.firebaseapp.com",
    projectId: "art-core-02",
    storageBucket: "art-core-02.appspot.com",
    messagingSenderId: "993784452380",
    appId: "1:993784452380:web:42203ecba5c7afd1ca96d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


// Signup/Login with Google
const signupWithGoogle = async () => {
    const res = await signInWithRedirect(auth, googleProvider);
}


// Logout
const logOut = () => {
    signOut(auth);
}


// Exports
export {
    app,
    auth,
    signupWithGoogle,
    googleProvider,
    logOut
};