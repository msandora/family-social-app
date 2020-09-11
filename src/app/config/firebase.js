import * as firebase from 'firebase/app';
// import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  // apiKey: "AIzaSyAyCj6L0iNt7kJnxVtqrq3Y5MZ39CFiy9A",
  // authDomain: "socialfamily-d58c8.firebaseapp.com",
  // databaseURL: "https://socialfamily-d58c8.firebaseio.com",
  // projectId: "socialfamily-d58c8",
  // storageBucket: "socialfamily-d58c8.appspot.com",
  // messagingSenderId: "581383764882"

  apiKey: 'AIzaSyCvhJgcBOCFw7HcSGXU1f6B3Ez31J7oSbE',
  authDomain: 'socialfamilyapp.firebaseapp.com',
  databaseURL: 'https://socialfamilyapp.firebaseio.com',
  projectId: 'socialfamilyapp',
  storageBucket: 'socialfamilyapp.appspot.com',
  messagingSenderId: '936564498134',
  appId: '1:936564498134:web:8ca3a7b73f4c57e4343377',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
