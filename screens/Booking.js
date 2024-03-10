import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Button,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { db } from "../bookingFire";
import DateTimePicker from "@react-native-community/datetimepicker";

function addBooking(uusername, ddate, ttime, llocation) {
  db.collection("booking-requests").add({
    username: uusername,
    date: ddate,
    time: ttime,
    location: llocation,
  });
  db.collection("bookings").add({
    username: uusername,
    date: ddate,
    time: ttime,
    location: llocation,
    status: false,
  });
  alert("Booking successful!");
}

class Booking extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      date: "",
      time: "",
      location: "",
    };
  }

  handleSubmit(username, date, time, location) {
    const reDate = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    const reTime = /^\d{1,2}:\d{2}([ap]m)?$/;
    if (username === "" || date === "" || time === "" || location === "") {
      alert("Please fill in all fields");
    } else if (!date.match(reDate)) {
      alert("Invalid date format");
    } else if (!time.match(reTime)) {
      alert("Invalud time format");
    } else {
      this.input1.clear();
      this.input2.clear();
      this.input3.clear();
      this.input4.clear();
      addBooking(username, date, time, location);
    }
  }

  handleUsername(input) {
    this.setState({ username: input });
  }

  handleDate(input) {
    this.setState({ date: input });
  }

  handleTime(input) {
    this.setState({ time: input });
  }

  handleLocation(input) {
    this.setState({ location: input });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>Username</Text>
          <TextInput
            style={styles.input}
            ref={(input) => {
              this.input1 = input;
            }}
            placeholder="User404"
            onChangeText={(text) => this.handleUsername(text)}
          />
        </View>
        <View>
          <Text style={styles.text}>Location</Text>
          <TextInput
            style={styles.input}
            ref={(input) => {
              this.input2 = input;
            }}
            placeholder="Room 404"
            onChangeText={(text) => this.handleLocation(text)}
          />
        </View>
        <View>
          <Text style={styles.text}>Date</Text>
          <TextInput
            style={styles.input}
            ref={(input) => {
              this.input3 = input;
            }}
            placeholder="DD/MM/YYYY"
            onChangeText={(text) => this.handleDate(text)}
          />
        </View>
        <View>
          <Text style={styles.text}>Time [24hr format]</Text>
          <TextInput
            style={styles.input}
            ref={(input) => {
              this.input4 = input;
            }}
            placeholder="HH:MM"
            onChangeText={(text) => this.handleTime(text)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Dashboard")}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this.handleSubmit(
                this.state.username,
                this.state.date,
                this.state.time,
                this.state.location
              )
            }
          >
            <Text style={styles.buttonText}>Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 10,
    backgroundColor: "#800080",
  },
  text: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    color: "#CBC3E3",
  },
  input: {
    fontSize: 18,
    alignSelf: "center",
    marginTop: 10,
    backgroundColor: "#FFEFFF",
    padding: 8,
    width: 180,
    borderRadius: 8,
    textAlign: "center",
  },
  buttonContainer: {
    height: 30,
    flexDirection: "row",
    marginTop: 80,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#CBC3E3",
    width: 130,
    height: 50,
    borderRadius: 8,
    marginLeft: 18,
    marginRight: 18,
    alignSelf: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#800080",
    alignSelf: "center",
  },
});

export default Booking;
