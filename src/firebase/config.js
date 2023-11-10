// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore/lite";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANCcdkoQfah5uqIRIU7v7Wi-odQPQHI50",
  authDomain: "firegallery-bd3c4.firebaseapp.com",
  projectId: "firegallery-bd3c4",
  storageBucket: "firegallery-bd3c4.appspot.com",
  messagingSenderId: "584321436468",
  appId: "1:584321436468:web:ce5e1965d76de9ab77f361",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);

export { projectFirestore, projectStorage };