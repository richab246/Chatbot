import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4G1IhCj0hULk68_n82ziBTvKCR15yxs8",
  authDomain: "voice-chatbot-aa2de.firebaseapp.com",
  projectId: "voice-chatbot-aa2de",
  storageBucket: "voice-chatbot-aa2de.appspot.com",
  messagingSenderId: "556886591821",
  appId: "1:556886591821:web:54383c0bc7bd45891e8f04",
};

var app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

// const database = getDatabase(app);

const auth = firebase.auth();
const db = app.firestore();

export { db, auth };
