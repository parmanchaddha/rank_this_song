import * as firebase from "firebase/app";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase";
const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCJSFpxlh7JNCSAiq7c9lSsi-20hiWCbPA",
    authDomain: "song-bracket.firebaseapp.com",
    databaseURL: "https://song-bracket.firebaseio.com",
    projectId: "song-bracket",
    storageBucket: "song-bracket.appspot.com",
    messagingSenderId: "731167469343",
    appId: "1:731167469343:web:eb53b8a059e1c2ef678a2a",
    measurementId: "G-1DH5J9B0EP"
  });
const db = firebaseConfig.firestore();
const increment =  firebase.firestore.FieldValue.increment(0.5);
const decrement =  firebase.firestore.FieldValue.increment(-1)
const current_value = firebase.firestore.FieldValue;

export { db, increment, current_value, decrement };