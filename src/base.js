import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyByxQZyKPA99iYYImUp3Pe22vl8-DJgPfI',
    authDomain: 'iron-tulio.firebaseapp.com',
    databaseURL: 'https://iron-tulio.firebaseio.com',
    projectId: 'iron-tulio',
    storageBucket: '',
    messagingSenderId: '551493062728'
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
