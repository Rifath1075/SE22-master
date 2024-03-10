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
import type { Node } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
function updateBug(id, note, iswitchValue, rswitchValue) {
  const bug = db.collection("bugs").doc(id);
  bug.update({ notes: note });
  bug.update({ Important: iswitchValue });
  bug.update({ Resolved: rswitchValue });
  Alert.alert("Bug updated!");
}

function deleteBug(id, { navigation }) {
  const bug = db.collection("bugs").doc(id);
  bug.delete();
  navigation.navigate("Bugs");
}

const Bug = ({ route, navigation }) => {
  var bugs = route.params.bugs;

  const [enteredNotes, setNotes] = useState("");
  const [iswitchValue, setiSwitchValue] = useState(bugs.Important);
  const [rswitchValue, setrSwitchValue] = useState(bugs.Resolved);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Bug ID: </Text>
      <TextInput
        style={styles.input}
        editable={false}
        selectTextOnFocus={false}
        placeholder={bugs.id.concat(" (Cannot be Modified)")}
      />
      <Text style={styles.text}>Bug Title: </Text>
      <TextInput
        style={styles.input}
        editable={false}
        selectTextOnFocus={false}
        placeholder={bugs.Title.concat(" (Cannot be Modified)")}
      />
      <Text style={styles.text}>Date Created: </Text>
      <TextInput
        style={styles.input}
        editable={false}
        selectTextOnFocus={false}
        placeholder={bugs.Date.concat(" (Cannot be Modified)")}
      />
      {/* <Text>User : </Text>
      <TextInput placeholder={bugs.userID.concat(" (Cannot be Modified)")} /> */}
      <Text style={styles.text}>Description : </Text>
      <TextInput
        style={styles.input}
        editable={false}
        selectTextOnFocus={false}
        placeholder={bugs.Description.concat(" (Cannot be Modified)")}
      />
      <Text style={styles.text}>Admin Notes :</Text>
      <TextInput
        style={styles.input}
        placeholder={bugs.notes}
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
          onPress={() => deleteBug(bugs.id, { navigation })}
        >
          <Text style={styles.buttonText}>DELETE BUG</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            updateBug(
              bugs.id,
              enteredNotes || bugs.notes,
              iswitchValue,
              rswitchValue
            )
          }
        >
          <Text style={styles.buttonText}>UPDATE BUG</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Bug;

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
    width: 130,
    height: 50,
    borderRadius: 18,
    marginLeft: 18,
    marginRight: 18,
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
