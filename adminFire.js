// firebase.js
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';
// import 'firebase/storage';
import * as firebase from "firebase";

if (!firebase.apps.length) {
  var fire = firebase.initializeApp({
    // apiKey: "AIzaSyDXLSZVXuaWn-8Zf2H4vRYZkonjaZWTr0A",
    // authDomain: "nativeprojec.firebaseapp.com",
    // projectId: "nativeprojec",
    // storageBucket: "nativeprojec.appspot.com",
    // messagingSenderId: "547328994357",
    // appId: "1:547328994357:web:77ebc260422076d87b157c",
    apiKey: "AIzaSyA527SbBYlnEl-ThSFYPsd-NilMcrUa8dI",
    authDomain: "booking-282b4.firebaseapp.com",
    projectId: "booking-282b4",
    storageBucket: "booking-282b4.appspot.com",
    messagingSenderId: "675432163415",
    appId: "1:675432163415:web:73fe86713e81260d1c9b12",
    measurementId: "G-TSMX2T8MFB",
  });
} else {
  var fire = firebase.app(); // if already initialized, use that one
}
fire.firestore().settings({ experimentalForceLongPolling: true });
export const auth = fire.auth();
export var db = fire.firestore();
db.settings({ experimentalForceLongPolling: true });

export default {
  fire,
};
