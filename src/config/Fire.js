import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDODwYxDxPOIjF9oXQqKIOSkE4feLRHccE",
  authDomain: "basicinventory-7e14f.firebaseapp.com",
  databaseURL: "https://basicinventory-7e14f.firebaseio.com",
  projectId: "basicinventory-7e14f",
  storageBucket: "basicinventory-7e14f.appspot.com",
  messagingSenderId: "896337643558",
  appId: "1:896337643558:web:a18abc358c8a5a430dfee7",
  measurementId: "G-J2RZR80G0L"
};

  const fire = firebase.initializeApp(config);
  export default fire; 