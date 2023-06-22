import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3MnY6irwn3pNAv4ZvNXA_RYwZ2zOYwwo",
  authDomain: "tasks-f9590.firebaseapp.com",
  projectId: "tasks-f9590",
  storageBucket: "tasks-f9590.appspot.com",
  messagingSenderId: "810757726063",
  appId: "1:810757726063:web:fce49256eb6a1b578b129a",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
