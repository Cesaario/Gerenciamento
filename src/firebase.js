import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyCntzaGIQQlzCQ0ut7tOUzmY4_bXdufwy8",
    authDomain: "gerenciamento-6528f.firebaseapp.com",
    databaseURL: "https://gerenciamento-6528f.firebaseio.com",
    projectId: "gerenciamento-6528f",
    storageBucket: "",
    messagingSenderId: "306893574752",
    appId: "1:306893574752:web:b8f855e2977cd6c4"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export {
    db, auth
}