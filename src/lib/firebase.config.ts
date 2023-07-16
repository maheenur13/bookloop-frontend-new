// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKIhYtiWjYfnz-EsokEbfgFtpec0gc9II",
  authDomain: "tech-net-515cd.firebaseapp.com",
  projectId: "tech-net-515cd",
  storageBucket: "tech-net-515cd.appspot.com",
  messagingSenderId: "12359353065",
  appId: "1:12359353065:web:9c0b48737c1299db3de678"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);