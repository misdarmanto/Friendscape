import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAKKfAAIGnjxQGx8oDZ5q0tthXj1drHTNE",
  authDomain: "chatapp-cebed.firebaseapp.com",
  projectId: "chatapp-cebed",
  storageBucket: "chatapp-cebed.appspot.com",
  messagingSenderId: "1012388122726",
  appId: "1:1012388122726:web:c7909363e01bf2ff2bdda7",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
