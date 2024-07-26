import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
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


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
