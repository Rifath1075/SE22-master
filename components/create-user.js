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
import firebase from "../loginFire";
import { db } from "../bookingFire";

function addUser(uuid, eemail, ccreated) {
  db.collection("users").add({
    uid: uuid,
    email: eemail,
    created: ccreated,
  });
}

class CreateUser extends Component {
  state = {
    email: "",
    password: "",
    uid: "",
  };
  registerUser = () => {
    if (this.state.email === "" && this.state.password === "") {
      Alert.alert("Enter details to signup!");
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((data) => {
          this.setState({ uid: data.user.uid });
          console.log("User registered successfully!");
          addUser(
            this.state.uid,
            this.state.email,
            new Date().toLocaleDateString("en-GB")
          );
          Alert.alert("User registered successfully!");
          this.setState({
            email: "",
            uid: "",
            password: "",
          });
          this.props.navigation.navigate("User Menu");
        })
        .catch((error) => this.error());
    }
  };

  error = () => {
    Alert.alert("Something went wrong!");
  };

  handleEmail = (text) => {
    this.setState({ email: text });
  };

  handlePassword = (text) => {
    this.setState({ password: text });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={this.handleEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={this.handlePassword}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.registerUser()}
        >
          <Text style={styles.buttonText}>Create User</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CreateUser;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#800080",
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
