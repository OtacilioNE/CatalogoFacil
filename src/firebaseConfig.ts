// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB5q__Hv9ZEj8JjXUxjILcw_MlK-XvKK0g",
    authDomain: "catalogo-facil-d4f9e.firebaseapp.com",
    projectId: "catalogo-facil-d4f9e",
    storageBucket: "catalogo-facil-d4f9e.appspot.com",
    messagingSenderId: "838637062308",
    appId: "1:838637062308:web:830ed531917dce25a53e31",
    measurementId: "G-15B14GC1PE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);
