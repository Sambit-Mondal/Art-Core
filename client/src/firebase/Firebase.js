// Initialize firebase
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAibwGylKMWMZc04UJtWspUFPxYyKUYPU",
    authDomain: "art-core-02.firebaseapp.com",
    projectId: "art-core-02",
    storageBucket: "art-core-02.appspot.com",
    messagingSenderId: "993784452380",
    appId: "1:993784452380:web:42203ecba5c7afd1ca96d9"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

const signupWithGoogle = async (auth, googleProvider) => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result;
    } catch (error) {
        throw error;
    }
};

export { auth, googleProvider, signupWithGoogle, db };