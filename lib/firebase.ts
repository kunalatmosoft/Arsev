import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Temporary Firebase configuration (replace with your actual config in production)
const firebaseConfig = {
    apiKey: "AIzaSyBUNwKvW_4nJycOCfJreOrfbkN9qcRaR44",
    authDomain: "oxpix-twitter-clone.firebaseapp.com",
    projectId: "oxpix-twitter-clone",
    storageBucket: "oxpix-twitter-clone.firebasestorage.app",
    messagingSenderId: "663660558548",
    appId: "1:663660558548:web:27cd5a2c3e3bc43e726341",
    measurementId: "G-E89880ZMPS"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

