import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAb8UkUTdGamIP-rtusFiKsRS9HhHaxsgI",
  authDomain: "luckypaws-aa7c3.firebaseapp.com",
  databaseURL: "https://luckypaws-aa7c3.firebaseio.com",
  projectId: "luckypaws-aa7c3",
  storageBucket: "luckypaws-aa7c3.appspot.com",
  messagingSenderId: "812916078045",
  appId: "1:812916078045:web:bc3a1e9ba92a046e727234"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();
