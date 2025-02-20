import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyBX98_Kdd66YPbrhXSrBx_hK7WJrTg62hs",
authDomain: "yaoi-ai-2c35f.firebaseapp.com",
projectId: "yaoi-ai-2c35f",
storageBucket: "yaoi-ai-2c35f.firebasestorage.app",
messagingSenderId: "1092202160971",
appId: "1:1092202160971:web:a3d7f468ec25e2040dbece"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-login-btn");
googleLogin.addEventListener("click", function(){
    console.log("MEOW")
})