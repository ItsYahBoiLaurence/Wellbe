// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBVcxx19O-uikwgNRSZshmgMxJsk4ClY9k",
    authDomain: "well-be-830f3.firebaseapp.com",
    projectId: "well-be-830f3",
    storageBucket: "well-be-830f3.firebasestorage.app",
    messagingSenderId: "524792389430",
    appId: "1:524792389430:web:195d9ce91918288fe19d97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth }
