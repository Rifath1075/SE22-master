import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { db } from "../adminFire";
function addBug(fnHome, fnReset, ttitle, ddescription, uuserID) {
  if (ttitle === "" || ddescription === "") {
    Alert.alert("Please fill all details!");
  } else {
    db.collection("bugs").add({
      Title: ttitle,
      Description: ddescription,
      Date: Date().substr(4, 20),
      notes: "",
      Important: false,
      Resolved: false,
    });
    fnReset();
    Alert.alert("Ticket submitted!");
    fnHome();
  }
}

class CreateBug extends Component {
  state = {
    title: "",
    description: "",
  };

  resetState = () => {
    this.setState({
      title: "",
      description: "",
    });
    this.input1.clear();
    this.input2.clear();
  };

  handleTitle = (text) => {
    this.setState({ title: text });
  };

  handleDescription = (text) => {
    this.setState({ description: text });
  };

  navigateHome = () => {
    this.props.navigation.navigate("Dashboard");
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          ref={(input) => {
            this.input1 = input;
          }}
          placeholder="Bug Title"
          onChangeText={this.handleTitle}
        />
        <TextInput
          style={styles.input}
          ref={(input) => {
            this.input2 = input;
          }}
          placeholder="Bug Description"
          onChangeText={this.handleDescription}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            addBug(
              this.navigateHome,
              this.resetState,
              this.state.title,
              this.state.description
            )
          }
        >
          <Text style={styles.buttonText}>REPORT BUG</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CreateBug;
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
  button: {
    backgroundColor: "#CBC3E3",
    width: 180,
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
