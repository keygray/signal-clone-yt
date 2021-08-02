import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
const firebaseConfig = {
   apiKey: "AIzaSyCBq-SfSGRTPRxv0tzWKK5RekOEzDUPbfU",
   authDomain: "test-app-chat-9d854.firebaseapp.com",
   projectId: "test-app-chat-9d854",
   storageBucket: "test-app-chat-9d854.appspot.com",
   messagingSenderId: "678574743356",
   appId: "1:678574743356:web:0a8fc0237f5f6145670839",
   measurementId: "G-H1YBZ2H4MQ"
};

let app;

if(firebase.apps.length === 0) {
   app = firebase.initializeApp(firebaseConfig);
} else {
   app = firebase.initializeApp(firebaseConfig);
}

const db = app.firestore();
const auth = firebase.auth();

export {db, auth};
