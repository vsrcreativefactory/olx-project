import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_dTAgvMV_Jc_cRSDhEZU-WBjVmZ4EaYg",
    authDomain: "fir-ec518.firebaseapp.com",
    projectId: "fir-ec518",
    storageBucket: "fir-ec518.appspot.com",
    messagingSenderId: "838085250818",
    appId: "1:838085250818:web:0bb07c52f46b9fd2893c1b",
    measurementId: "G-14LTS5HLVE"
  };

export default firebase.initializeApp(firebaseConfig)