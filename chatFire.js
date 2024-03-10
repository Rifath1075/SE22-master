import firebase from "firebase"; // 4.8.1
import { Alert } from "react-native";

class Fire {
  constructor() {
    this.init();
    this.observeAuth();
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyA527SbBYlnEl-ThSFYPsd-NilMcrUa8dI",
        authDomain: "booking-282b4.firebaseapp.com",
        databaseURL: "https://booking-282b4-default-rtdb.firebaseio.com/",
        projectId: "booking-282b4",
        storageBucket: "booking-282b4.appspot.com",
        messagingSenderId: "675432163415",
        appId: "1:675432163415:web:73fe86713e81260d1c9b12",
        measurementId: "G-TSMX2T8MFB",
      });
    }
  };

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = (user) => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref("messages");
  }

  parse = (snapshot) => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  on = (callback) =>
    this.ref
      .limitToLast(20)
      .on("child_added", (snapshot) => callback(this.parse(snapshot)));

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  // send the message to the Backend
  send = (messages) => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      firebase.database().ref("messages").push(message);
    }
  };

  append = (message) => this.ref.push(message);

  // close the connection to the Backend
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;
