import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBX98_Kdd66YPbrhXSrBx_hK7WJrTg62hs",
    authDomain: "yaoi-ai-2c35f.firebaseapp.com",
    projectId: "yaoi-ai-2c35f",
    storageBucket: "yaoi-ai-2c35f.firebasestorage.app",
    messagingSenderId: "1092202160971",
    appId: "1:1092202160971:web:a3d7f468ec25e2040dbece"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
