import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA527SbBYlnEl-ThSFYPsd-NilMcrUa8dI",
  authDomain: "booking-282b4.firebaseapp.com",
  projectId: "booking-282b4",
  storageBucket: "booking-282b4.appspot.com",
  messagingSenderId: "675432163415",
  appId: "1:675432163415:web:73fe86713e81260d1c9b12",
  measurementId: "G-TSMX2T8MFB",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// firebase.initializeApp(firebaseConfig);

export default firebase;
