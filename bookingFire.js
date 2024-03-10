// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/storage";
import * as firebase from "firebase";

if (!firebase.apps.length) {
  var fire = firebase.initializeApp({
    apiKey: "AIzaSyA527SbBYlnEl-ThSFYPsd-NilMcrUa8dI",
    authDomain: "booking-282b4.firebaseapp.com",
    projectId: "booking-282b4",
    storageBucket: "booking-282b4.appspot.com",
    messagingSenderId: "675432163415",
    appId: "1:675432163415:web:73fe86713e81260d1c9b12",
    measurementId: "G-TSMX2T8MFB",
  });
} else {
  var fire = firebase.app();
}
fire.firestore().settings({ experimentalForceLongPolling: true });
export const auth = fire.auth();
export var db = fire.firestore();
db.settings({ experimentalForceLongPolling: true });

export default {
  fire,
};
