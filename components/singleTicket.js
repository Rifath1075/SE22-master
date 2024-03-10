import React, { setState, useState, useEffect, Component } from "react";
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  List,
  Alert,
  Switch,
} from "react-native";
import { db } from "../adminFire";
import { fire } from "../adminFire";
import type { Node } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import firebase from "firebase/app";

function updateTicket(id, note, iswitchValue, rswitchValue) {
  const ticket = db.collection("tickets").doc(id);
  ticket.update({ notes: note });
  ticket.update({ Important: iswitchValue });
  ticket.update({ Resolved: rswitchValue });
  Alert.alert("Ticket updated!");
}

function deleteTicket(id, { navigation }) {
  const ticket = db.collection("tickets").doc(id);
  ticket.delete();
  navigation.navigate("Tickets");
}

const singleTicket = ({ route, navigation }) => {
  var tickets = route.params.tickets;

  const [enteredNotes, setNotes] = useState("");
  const [iswitchValue, setiSwitchValue] = useState(tickets.Important);
  const [rswitchValue, setrSwitchValue] = useState(tickets.Resolved);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Ticket ID: </Text>
      <TextInput
        style={styles.input}
        editable={false}
        selectTextOnFocus={false}
        placeholder={tickets.id.concat(" (Cannot be Modified)")}
      />
      <Text style={styles.text}>User: </Text>
      <TextInput
        style={styles.input}
        editable={false}
        selectTextOnFocus={false}
        placeholder={tickets.User.concat(" (Cannot be Modified)")}
      />
      <Text style={styles.text}>Ticket Title: </Text>
      <TextInput
        style={styles.input}
        editable={false}
        selectTextOnFocus={false}
        placeholder={tickets.Title.concat(" (Cannot be Modified)")}
      />
      <Text style={styles.text}>Date Created: </Text>
      <TextInput
        style={styles.input}
        editable={false}
        selectTextOnFocus={false}
        placeholder={tickets.Date.concat(" (Cannot be Modified)")}
      />
      <Text style={styles.text}>Description : </Text>
      <TextInput
        style={styles.input}
        editable={false}
        selectTextOnFocus={false}
        placeholder={tickets.Description.concat(" (Cannot be Modified)")}
      />
      <Text style={styles.text}>Admin Notes :</Text>
      <TextInput
        style={styles.input}
        placeholder={tickets.notes}
        onChangeText={(text) => setNotes(text)}
      />
      <Text style={styles.text}>Current Importance : </Text>
      <View style={styles.inlineSwitch}>
        <Text style={styles.inlineSwitch}>
          {iswitchValue ? "Important" : "Not Important"}
        </Text>
        <Switch
          style={(styles.inlineSwitch, { position: "absolute", right: 0 })}
          title="Mark as important"
          onValueChange={setiSwitchValue}
          value={iswitchValue}
        />
      </View>
      <Text style={styles.text}>Issue Resolved : </Text>
      <View style={styles.inlineSwitch}>
        <Text style={styles.inlineSwitch}>
          {rswitchValue
            ? "Issue has been marked as resolved"
            : "Issue not yet resolved"}
        </Text>
        <Switch
          style={(styles.inlineSwitch, { position: "absolute", right: 0 })}
          title="Mark as important"
          onValueChange={setrSwitchValue}
          value={rswitchValue}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => deleteTicket(tickets.id, { navigation })}
        >
          <Text style={styles.buttonText}>DELETE TICKET</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            updateTicket(
              tickets.id,
              enteredNotes || tickets.notes,
              iswitchValue,
              rswitchValue
            )
          }
        >
          <Text style={styles.buttonText}>UPDATE TICKET</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default singleTicket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    // width: 180,
    borderRadius: 8,
    textAlign: "center",
  },
  inlineSwitch: {
    flexDirection: "row",
    color: "#CBC3E3",
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonContainer: {
    // height: 30,
    flexDirection: "row",
    marginBottom: 80,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#CBC3E3",
    width: 180,
    height: 50,
    borderRadius: 18,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 18,
    alignSelf: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#800080",
    alignSelf: "center",
  },
});
