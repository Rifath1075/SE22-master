import "react-native-gesture-handler";
import React from "react";
import {
  StyleSheet,
  Switch,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import Icon from "react-native-vector-icons/Entypo";
import firebase from "../loginFire";

const MainPage = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {(route.params.type === "employee" || route.params.type === "mhc") && (
          <TouchableOpacity
            style={styles.moodButton}
            onPress={() => navigation.navigate("MoodTracker")}
          >
            <Icon name="emoji-happy" style={styles.icon}></Icon>
            <Text style={styles.text}>MOOD TRACKER</Text>
          </TouchableOpacity>
        )}
        {(route.params.type === "employee" || route.params.type === "mhc") && (
          <TouchableOpacity
            style={styles.dietButton}
            onPress={() => navigation.navigate("DietTracker")}
          >
            <Icon name="bowl" style={styles.icon}></Icon>
            <Text style={styles.text}>DIET TRACKER</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.buttonContainer}>
        {route.params.type === "employee" && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Booking")}
          >
            <Icon name="calendar" style={styles.icon}></Icon>
            <Text style={styles.text}>BOOK APPOINTMENT</Text>
          </TouchableOpacity>
        )}
        {route.params.type === "employee" && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ViewBooking")}
          >
            <Icon name="open-book" style={styles.icon}></Icon>
            <Text style={styles.text}>VIEW APPOINTMENTS</Text>
          </TouchableOpacity>
        )}
      </View>
      {route.params.type === "employee" && (
        <TouchableOpacity
          style={styles.longButton}
          onPress={() => navigation.navigate("ChatLogin")}
        >
          <Icon name="chat" style={styles.icon}></Icon>
          <Text style={styles.text}>MESSAGE MENTAL HEALTH CHAMPION</Text>
        </TouchableOpacity>
      )}
      {route.params.type === "mhc" && (
        <TouchableOpacity
          style={styles.longButton}
          onPress={() => navigation.navigate("ChatLogin")}
        >
          <Icon name="chat" style={styles.icon}></Icon>
          <Text style={styles.text}>MESSAGE EMPLOYEE</Text>
        </TouchableOpacity>
      )}
      {route.params.type === "mhc" && (
        <TouchableOpacity
          style={styles.longButton}
          onPress={() => navigation.navigate("ManageBooking")}
        >
          <Icon name="calendar" style={styles.icon}></Icon>
          <Text style={styles.text}>MANAGE BOOKINGS</Text>
        </TouchableOpacity>
      )}
      {route.params.type === "admin" && (
        <TouchableOpacity
          style={styles.longButton}
          onPress={() => navigation.navigate("Admin Menu")}
        >
          <Icon name="browser" style={styles.icon}></Icon>
          <Text style={styles.text}>ADMIN PANEL</Text>
        </TouchableOpacity>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.helpButton}
          onPress={() => navigation.navigate("Create Ticket")}
        >
          <Icon name="help-with-circle" style={styles.icon}></Icon>
          <Text style={styles.text}>REQUEST SUPPORT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.helpButton}
          onPress={() => navigation.navigate("Report Bug")}
        >
          <Icon name="bug" style={styles.icon}></Icon>
          <Text style={styles.text}>REPORT BUG</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#800080",
    width: 130,
    height: 130,
    borderRadius: 8,
    marginTop: 30,
    marginRight: 8,
    marginLeft: 8,
    justifyContent: "center",
    alignSelf: "center",
  },
  longButton: {
    backgroundColor: "#800080",
    width: 275,
    height: 130,
    borderRadius: 8,
    marginTop: 30,
    marginRight: 8,
    marginLeft: 8,
    justifyContent: "center",
    alignSelf: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
    marginTop: 30,
  },
  icon: {
    color: "white",
    fontSize: 50,
    height: 50,
    width: 50,
    alignSelf: "center",
  },
  moodButton: {
    backgroundColor: "#6D82E3",
    width: 130,
    height: 130,
    borderRadius: 8,
    marginTop: 30,
    marginRight: 8,
    marginLeft: 8,
    justifyContent: "center",
    alignSelf: "center",
  },
  dietButton: {
    backgroundColor: "#32CD32",
    width: 130,
    height: 130,
    borderRadius: 8,
    marginTop: 30,
    marginRight: 8,
    marginLeft: 8,
    justifyContent: "center",
    alignSelf: "center",
  },
  helpButton: {
    backgroundColor: "#232b2b",
    width: 130,
    height: 130,
    borderRadius: 8,
    marginTop: 30,
    marginRight: 8,
    marginLeft: 8,
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default MainPage;
