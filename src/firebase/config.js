import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyBNuPRX-6l5tPy2_4QvENDIttYFVNFUQag",
    authDomain: "mymoney-fc52a.firebaseapp.com",
    projectId: "mymoney-fc52a",
    storageBucket: "mymoney-fc52a.appspot.com",
    messagingSenderId: "7929991297",
    appId: "1:7929991297:web:504e5e6686b8c4ea333d80"
  };

  // init firbase 

  firebase.initializeApp(firebaseConfig);

  // ionit service
  const projectFirestore = firebase.firestore();
  const projectAuth = firebase.auth()
  const timestamp = firebase.firestore.Timestamp

  export {projectFirestore, projectAuth, timestamp}
