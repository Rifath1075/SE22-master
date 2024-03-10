import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";

class AddMood extends Component {
  constructor() {
    super();
    this.state = {
      currentMood: null,
      clicked: false,
      sadChosen: false,
      neutralChosen: false,
      happyChose: false,
    };
    this.sadClick = this.sadClick.bind(this);
    this.neutralClick = this.neutralClick.bind(this);
    this.happyClick = this.happyClick.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    this.submitClick = this.submitClick.bind(this);
  }

  cancelClick() {
    this.setState({
      currentMood: null,
      clicked: false,
      sadChosen: false,
      neutralChosen: false,
      happyChose: false,
    });
    this.props.cancel();
  }

  submitClick() {
    if (this.state.currentMood === null) {
      alert("Please choose a mood!");
    } else {
      if (this.props.type === "add") {
        this.props.confirm(this.state.currentMood);
      } else {
        this.props.edit(this.state.currentMood, this.props.time);
      }
      this.setState({
        currentMood: null,
        clicked: false,
        sadChosen: false,
        neutralChosen: false,
        happyChosen: false,
      });
    }
  }

  sadClick() {
    if (this.state.clicked === false) {
      this.setState({
        currentMood: "emoji-sad",
        clicked: true,
        sadChosen: true,
        neutralChosen: false,
        happyChosen: false,
      });
    } else {
      this.setState({
        currentMood: null,
        clicked: false,
        sadChosen: false,
        neutralChosen: false,
        happyChosen: false,
      });
    }
  }

  neutralClick() {
    if (this.state.clicked === false) {
      this.setState({
        currentMood: "emoji-neutral",
        clicked: true,
        sadChosen: false,
        neutralChosen: true,
        happyChosen: false,
      });
    } else {
      this.setState({
        currentMood: null,
        clicked: false,
        sadChosen: false,
        neutralChosen: false,
        happyChosen: false,
      });
    }
  }

  happyClick() {
    if (this.state.clicked === false) {
      this.setState({
        currentMood: "emoji-happy",
        clicked: true,
        sadChosen: false,
        neutralChosen: false,
        happyChosen: true,
      });
    } else {
      this.setState({
        currentMood: null,
        clicked: false,
        sadChosen: false,
        neutralChosen: false,
        happyChosen: false,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rect}>
          <View style={styles.button3Row}>
            <TouchableOpacity onPress={this.sadClick} style={styles.button3}>
              <EntypoIcon
                name="emoji-sad"
                style={this.state.sadChosen ? styles.iconPressed : styles.icon}
              ></EntypoIcon>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.neutralClick}
              style={styles.button4}
            >
              <EntypoIcon
                name="emoji-neutral"
                style={
                  this.state.neutralChosen ? styles.icon2Pressed : styles.icon2
                }
              ></EntypoIcon>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.happyClick} style={styles.button5}>
              <EntypoIcon
                name="emoji-happy"
                style={
                  this.state.happyChosen ? styles.icon3Pressed : styles.icon3
                }
              ></EntypoIcon>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={this.cancelClick} style={styles.button}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.submitClick} style={styles.button2}>
              <Text style={styles.submit}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  rect: {
    marginTop: -190,
    width: 250,
    height: 130,
    backgroundColor: "rgba(255,255,255,1)",
    // borderWidth: 3,
    // borderColor: "rgba(74,144,226,1)",
    borderRadius: 30,
    alignSelf: "center",
  },
  button3: {
    width: 40,
    height: 44,
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 44,
    width: 40,
  },
  iconPressed: {
    color: "rgba(223,41,53,1)",
    fontSize: 40,
    height: 44,
    width: 40,
  },
  button4: {
    width: 40,
    height: 44,
    marginLeft: 25,
    marginRight: 25,
  },
  icon2: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 44,
    width: 40,
  },
  icon2Pressed: {
    color: "rgba(253,202,64,1)",
    fontSize: 40,
    height: 44,
    width: 40,
  },
  button5: {
    width: 40,
    height: 44,
    // marginLeft: 15
  },
  icon3: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 44,
    width: 40,
  },
  icon3Pressed: {
    color: "rgba(62,136,91,1)",
    fontSize: 40,
    height: 44,
    width: 40,
  },
  button3Row: {
    height: 44,
    flexDirection: "row",
    marginTop: 21,
    marginLeft: 30,
    marginRight: 30,
    alignSelf: "center",
  },
  button: {
    width: 85,
    height: 30,
    backgroundColor: "#800080",
    // borderWidth: 3,
    // borderColor: "rgba(74,144,226,1)",
    borderRadius: 130,
    marginLeft: 15,
  },
  cancel: {
    color: "#CBC3E3",
    fontSize: 15,
    marginTop: 3,
    alignSelf: "center",
    fontWeight: "bold",
  },
  button2: {
    width: 85,
    height: 30,
    backgroundColor: "#800080",
    // borderWidth: 3,
    // borderColor: "rgba(74,144,226,1)",
    borderRadius: 130,
    marginLeft: 15,
  },
  submit: {
    color: "#CBC3E3",
    fontSize: 15,
    marginTop: 3,
    alignSelf: "center",
    fontWeight: "bold",
  },
  buttonRow: {
    height: 30,
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default AddMood;
