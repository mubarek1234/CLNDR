import firebase from 'firebase/app'
import 'firebase/firestore'

//   // Your web app's Firebase configuration
 var firebaseConfig = {
       apiKey: "AIzaSyDsvpqiN3IL8GGcYup5c70L5E-TeeLnqxQ",
        authDomain: "clndr-c96b5.firebaseapp.com",
        databaseURL: "https://clndr-c96b5.firebaseio.com",
        projectId: "clndr-c96b5",
        storageBucket: "clndr-c96b5.appspot.com",
        messagingSenderId: "405375247923",
        appId: "1:405375247923:web:3ac186cec30abcd9526546",
        measurementId: "G-JKM6FS26PT"
  };
   //Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase
