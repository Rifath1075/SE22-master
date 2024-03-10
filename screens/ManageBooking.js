import React, { useState, useEffect, Component } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { db } from "../bookingFire";

function deleteBooking(id, uusername, ddate, ttime, llocation) {
  const booking = db.collection("booking-requests").doc(id);
  const ref = db.collection("bookings");
  ref.onSnapshot((query) => {
    const objs = [];
    query.forEach((doc) => {
      objs.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    var temp = null;
    objs.forEach((booking) => {
      if (
        booking.username === uusername &&
        booking.date === ddate &&
        booking.time === ttime &&
        booking.location === llocation
      ) {
        temp = booking;
      }
    });
    if (temp !== null) {
      var toDelete = db.collection("bookings").doc(temp.id);
      toDelete.delete();
    }
  });
  booking.delete();
}

function acceptBooking(id, uusername, ddate, ttime, llocation) {
  const booking = db.collection("booking-requests").doc(id);
  const ref = db.collection("bookings");
  ref.onSnapshot((query) => {
    const objs = [];
    query.forEach((doc) => {
      objs.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    var temp = null;
    objs.forEach((booking) => {
      if (
        booking.username === uusername &&
        booking.date === ddate &&
        booking.time === ttime &&
        booking.location === llocation
      ) {
        temp = booking;
      }
    });
    if (temp === null) {
      db.collection("bookings").add({
        username: uusername,
        date: ddate,
        time: ttime,
        location: llocation,
        status: true,
      });
    } else {
      db.collection("bookings").doc(temp.id).update({
        status: true,
      });
    }
  });
  booking.delete();
}

const ManageBooking = () => {
  const [bookings, setBooking] = useState([]);
  useEffect(() => {
    const ref = db.collection("booking-requests");
    ref.onSnapshot((query) => {
      const objs = [];
      query.forEach((doc) => {
        objs.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      console.log(objs);
      setBooking(objs);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.rect}>
        <View style={styles.usernameRow}>
          <Text style={styles.username}>Username</Text>
          <Text style={styles.date}>Date</Text>
          <Text style={styles.time}>Time</Text>
          <Text style={styles.location}>Location</Text>
        </View>
      </View>
      {bookings.map((booking) => (
        <View style={styles.rect2} key={booking.id}>
          <View style={styles.loremIpsumRow}>
            <Text style={styles.loremIpsum}>{booking.username}</Text>
            <Text style={styles.loremIpsum1}>{booking.date}</Text>
            <Text style={styles.loremIpsum2}>{booking.time}</Text>
            <Text style={styles.loremIpsum4}>{booking.location}</Text>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              onPress={() =>
                deleteBooking(
                  booking.id,
                  booking.username,
                  booking.date,
                  booking.time,
                  booking.location
                )
              }
              style={styles.button}
            >
              <Text style={styles.decline}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                acceptBooking(
                  booking.id,
                  booking.username,
                  booking.date,
                  booking.time,
                  booking.location
                )
              }
              style={styles.button1}
            >
              <Text style={styles.accept}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#800080",
  },
  rect: {
    height: 50,
    backgroundColor: "#CBC3E3",
    flexDirection: "row",
    marginTop: 25,
  },
  username: {
    color: "#800080",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 0,
  },
  date: {
    color: "#800080",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 40,
  },
  time: {
    color: "#800080",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 40,
  },
  location: {
    color: "#800080",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 40,
  },
  usernameRow: {
    backgroundColor: "#CBC3E3",
    height: 24,
    flexDirection: "row",
    flex: 1,
    marginTop: 10,
    justifyContent: "center",
  },
  rect2: {
    height: 90,
    backgroundColor: "#CBC3E3",
    marginTop: 15,
  },
  loremIpsum: {
    width: 100,
    color: "#800080",
  },
  loremIpsum1: {
    width: 105,
    color: "#800080",
  },
  loremIpsum2: {
    width: 80,
    color: "#800080",
  },
  loremIpsum4: {
    color: "#800080",
  },
  loremIpsumRow: {
    height: 20,
    flexDirection: "row",
    justifyContent: "center",
    // margin: 5
  },
  button: {
    width: 100,
    height: 30,
    backgroundColor: "rgba(208,2,27,1)",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 30,
  },
  decline: {
    color: "rgba(255,255,255,1)",
    marginTop: 5,
    alignSelf: "center",
  },
  button1: {
    width: 100,
    height: 30,
    backgroundColor: "rgba(126,211,33,1)",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 30,
    marginLeft: 60,
  },
  accept: {
    color: "rgba(255,255,255,1)",
    marginTop: 5,
    alignSelf: "center",
  },
  buttonRow: {
    height: 30,
    flexDirection: "row",
    marginTop: 23,
    marginLeft: 51,
    marginRight: 49,
  },
});

export default ManageBooking;
