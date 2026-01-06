import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAjNblfiyLIPt54hPXNa1VnlgHfgwKpe9g",
    authDomain: "login-auth-a1a16.firebaseapp.com",
    projectId: "login-auth-a1a16",
    storageBucket: "login-auth-a1a16.firebasestorage.app",
    messagingSenderId: "857329968263",
    appId: "1:857329968263:web:e3b5022c93585f08624422"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();