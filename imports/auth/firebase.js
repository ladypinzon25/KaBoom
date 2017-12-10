import firebase from 'firebase/app';
import 'firebase/auth';
const config = {
  apiKey: "AIzaSyDR2htMJ894oyl9aiUkarxiyVvKJVY0qr0",
  authDomain: "kaboom-f7636.firebaseapp.com",
  databaseURL: "https://kaboom-f7636.firebaseio.com",
  projectId: "kaboom-f7636",
  storageBucket: "kaboom-f7636.appspot.com",
  messagingSenderId: "8523964711"
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
