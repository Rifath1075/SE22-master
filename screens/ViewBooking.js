import React, { useState, useEffect, Component } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import AddMood from "../components/AddFood";
import { db } from "../bookingFire";
import Prompt from "react-native-input-prompt";

function submit(fnA, fnB, text) {
  if (text === "") {
    Alert.alert("Please enter username!");
  } else {
    fnA(text);
    fnB(false);
  }
}

function cancel(fnA, fnB) {
  fnA(false);
  fnB;
}

const ManageBooking = ({ navigation }) => {
  const [bookings, setBooking] = useState([]);
  const [visible, setVisible] = useState(true);
  const [uusername, setUsername] = useState(null);

  useEffect(() => {
    const ref = db.collection("bookings");
    ref.onSnapshot((query) => {
      const objs = [];
      query.forEach((doc) => {
        objs.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      const temp = [];
      objs.forEach((booking) => {
        if (booking.username === uusername) {
          temp.push(booking);
        }
      });
      setBooking(temp);
    });
  }, [uusername]);

  return (
    <View style={styles.container}>
      <Prompt
        visible={visible}
        title="Enter username"
        placeholder="Username"
        onCancel={() => cancel(setVisible, navigation.navigate("Dashboard"))}
        onSubmit={(text) => submit(setUsername, setVisible, text)}
      />
      <View style={styles.rect}>
        <View style={styles.usernameRow}>
          <Text style={styles.username}>Date</Text>
          <Text style={styles.date}>Time</Text>
          <Text style={styles.time}>Location</Text>
          <Text style={styles.location}>Status</Text>
        </View>
      </View>
      {bookings.map((booking) => (
        <View style={styles.rect2} key={booking.id}>
          <View style={styles.loremIpsumRow}>
            <Text style={styles.loremIpsum}>{booking.date}</Text>
            <Text style={styles.loremIpsum1}>{booking.time}</Text>
            <Text style={styles.loremIpsum2}>{booking.location}</Text>
            <Text style={styles.loremIpsum4}>
              {(booking.status.toString() === "true" && "Confirmed") ||
                "Pending"}
            </Text>
          </View>
          <View style={styles.buttonRow}></View>
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
    marginLeft: 0,
  },
  date: {
    color: "#800080",
    fontSize: 20,
    marginLeft: 40,
  },
  time: {
    color: "#800080",
    fontSize: 20,
    marginLeft: 40,
  },
  location: {
    color: "#800080",
    fontSize: 20,
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
    height: 30,
    backgroundColor: "#CBC3E3",
    marginTop: 15,
  },
  loremIpsum: {
    color: "#800080",
    width: 100,
  },
  loremIpsum1: {
    color: "#800080",
    width: 80,
  },
  loremIpsum2: {
    color: "#800080",
    width: 110,
  },
  loremIpsum4: {
    color: "#800080",
    width: 70,
    textAlign: "center",
  },
  loremIpsumRow: {
    height: 20,
    flexDirection: "row",
    justifyContent: "center",
    // margin: 5,
  },
});

export default ManageBooking;
