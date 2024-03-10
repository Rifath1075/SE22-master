import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

class ChatLogin extends React.Component {

  state = {
    name: "",
  };

  onPress = () => {
    if (this.state.name === "") {
      Alert.alert("Please enter a display name!");
    } else {
      this.props.navigation.navigate("Chat", { name: this.state.name });
    }
  };
  onChangeText = (name) => this.setState({ name });

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Enter your name:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder=""
          onChangeText={this.onChangeText}
          value={this.state.name}
        />
        <TouchableOpacity style={styles.button} onPress={this.onPress}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const offset = 24;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  title: {
    marginTop: 18,
    fontWeight: "bold",
    fontSize: 30,
    alignSelf: "center",
    color: "#800080",
  },
  nameInput: {
    fontSize: 18,
    alignSelf: "center",
    marginTop: 10,
    padding: 8,
    width: 380,
    borderRadius: 8,
    borderColor: "#800080",
    borderWidth: 2,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#800080",
    width: 80,
    height: 30,
    borderRadius: 8,
    marginTop: 8,
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 27,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
  },
});

export default ChatLogin;
