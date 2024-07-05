// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase/Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // User is logged in with Firebase (Google)
                const userData = {
                    uid: firebaseUser.uid,
                    displayName: firebaseUser.displayName,
                    email: firebaseUser.email,
                };

                setUser(userData);
                
                // Save user info to Firestore if not already saved
                const userRef = doc(db, 'users', firebaseUser.uid);
                const docSnap = await getDoc(userRef);

                if (!docSnap.exists()) {
                    await setDoc(userRef, userData);
                }
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const loginUserWithEmailAndPassword = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message, { position: 'top-center' });
                const loggedInUser = {
                    email: email,
                    displayName: data.username // Assuming username is returned from backend
                };
                setUser(loggedInUser);
                return loggedInUser;
            } else {
                toast.error(data.message, { position: 'top-center' });
                return null;
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.', { position: 'top-center' });
            return null;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loginUserWithEmailAndPassword, logout }}>
            {children}
        </AuthContext.Provider>
    );
};