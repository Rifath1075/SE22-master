import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import TimeIcon from "react-native-vector-icons/Feather";
import AddMood from "../components/AddMood";
import AsyncStorage from "@react-native-async-storage/async-storage";

class MoodTracker extends Component {
  constructor() {
    super();
    this.state = {
      currentMood: "help",
      morningMood: "help",
      afternoonMood: "help",
      nightMood: "help",
      clicked: false,
      type: null,
      timeToEdit: null,
    };
    this.addCurrent = this.addCurrent.bind(this);
    this.editMood = this.editMood.bind(this);
    this.currentMoodStyle = this.currentMoodStyle.bind(this);
    this.pastMoodStyle = this.pastMoodStyle.bind(this);

    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
    this.edit = this.edit.bind(this);

    this.notify = this.notify.bind(this);
  }

  componentDidMount() {
    var current = this.retrieveData("currentMood");
    var morning = this.retrieveData("morningMood");
    var afternoon = this.retrieveData("afternoonMood");
    var night = this.retrieveData("nightMood");
  }

  retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        this.setState({ [key]: value });
      } else {
        return null;
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  storeData = async (key, value) => {
    try {
      console.log(key, value);
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Error saving data
    }
  };

  addCurrent() {
    if (this.state.clicked === false) {
      this.setState({ clicked: true, type: "add" });
    }
  }

  editMood(mood) {
    if (this.state.clicked === false) {
      this.setState({
        clicked: true,
        type: "edit",
        timeToEdit: mood,
      });
    }
  }

  confirm(mood) {
    this.setState({ currentMood: mood });
    this.storeData("currentMood", mood);
    if (new Date().getHours() >= 6 && new Date().getHours() < 12) {
      this.setState({ morningMood: mood });
      this.storeData("morningMood", mood);
    } else if (new Date().getHours() >= 12 && new Date().getHours() < 18) {
      this.setState({ afternoonMood: mood });
      this.storeData("afternoonMood", mood);
    } else if (new Date().getHours() >= 18 || new Date().getHours() < 6) {
      this.setState({ nightMood: mood });
      this.storeData("nightMood", mood);
    }
    this.setState({
      clicked: false,
      type: null,
    });
    if (mood === "emoji-sad") {
      this.notify();
    }
  }

  cancel() {
    this.setState({ clicked: false });
  }

  edit(mood, time) {
    this.setState({
      [time]: mood,
      clicked: false,
      type: null,
      timeToEdit: null,
    });
    this.storeData(time, mood);
  }

  currentMoodStyle(time) {
    if (time === "emoji-sad") {
      return styles.iconSad;
    } else if (time === "emoji-neutral") {
      return styles.iconNeutral;
    } else if (time === "emoji-happy") {
      return styles.iconHappy;
    } else {
      return styles.icon;
    }
  }

  pastMoodStyle(time) {
    if (time === "emoji-sad") {
      return styles.iconSadPast;
    } else if (time === "emoji-neutral") {
      return styles.iconNeutralPast;
    } else if (time === "emoji-happy") {
      return styles.iconHappyPast;
    } else {
      return styles.icon2;
    }
  }

  notify() {
    Alert.alert(
      "Message",
      "If you require, you may speak with a mental health champion."
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          {/* <Text style={styles.moodTracker}>Mood Tracker</Text> */}
          <View style={styles.rect}>
            <Icon
              name={this.state.currentMood}
              style={this.currentMoodStyle(this.state.currentMood)}
            ></Icon>
          </View>
          <TouchableOpacity onPress={this.addCurrent} style={styles.button2}>
            <Text style={styles.addMood}>Add Mood</Text>
          </TouchableOpacity>
        </View>
        <View style={this.state.clicked ? styles.pop : styles.gone}>
          <AddMood
            confirm={this.confirm}
            edit={this.edit}
            cancel={this.cancel}
            type={this.state.type}
            time={this.state.timeToEdit}
          />
        </View>
        <View style={styles.bottom}>
          <View style={styles.groupRow}>
            <View style={styles.group}>
              <TimeIcon name="sunrise" style={styles.timeIcon}></TimeIcon>
              <View style={styles.rect3}>
                <Icon
                  name={this.state.morningMood}
                  style={this.pastMoodStyle(this.state.morningMood)}
                ></Icon>
              </View>
              <TouchableOpacity
                onPress={() => this.editMood("morningMood")}
                style={styles.button}
              >
                <Text style={styles.editMood}>Edit Mood</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.group1}>
              <TimeIcon name="sun" style={styles.timeIcon}></TimeIcon>
              <View style={styles.rect4}>
                <Icon
                  name={this.state.afternoonMood}
                  style={this.pastMoodStyle(this.state.afternoonMood)}
                ></Icon>
              </View>
              <TouchableOpacity
                onPress={() => this.editMood("afternoonMood")}
                style={styles.button3}
              >
                <Text style={styles.editMood}>Edit Mood</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.group2}>
              <TimeIcon name="sunset" style={styles.timeIcon}></TimeIcon>
              <View style={styles.rect5}>
                <Icon
                  name={this.state.nightMood}
                  style={this.pastMoodStyle(this.state.nightMood)}
                ></Icon>
              </View>
              <TouchableOpacity
                onPress={() => this.editMood("nightMood")}
                style={styles.button4}
              >
                <Text style={styles.editMood}>Edit Mood</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 0.65,
    backgroundColor: "#800080",
  },
  bottom: {
    flex: 0.35,
    backgroundColor: "#CBC3E3",
  },
  timeIcon: {
    color: "#800080",
    fontSize: 50,
    height: 50,
    width: 50,
    marginTop: -50,
    marginBottom: 15,
    alignSelf: "center",
  },
  gone: {
    display: "none",
  },
  pop: {
    display: "flex",
  },
  moodTracker: {
    color: "rgba(234,242,124,1)",
    fontSize: 35,
    height: 39,
    marginTop: 50,
    alignSelf: "center",
    fontWeight: "bold",
  },
  rect: {
    width: 250,
    height: 250,
    backgroundColor: "rgba(251,250,248,1)",
    // borderWidth: 9,
    // borderColor: "rgba(146,45,80,1)",
    borderRadius: 30,
    marginTop: 50,
    alignSelf: "center",
  },
  icon: {
    color: "#800080",
    fontSize: 200,
    height: 218,
    width: 200,
    marginTop: 16,
    alignSelf: "center",
  },
  iconSad: {
    color: "rgba(223,41,53,1)",
    fontSize: 200,
    height: 218,
    width: 200,
    marginTop: 16,
    alignSelf: "center",
  },
  iconNeutral: {
    color: "rgba(253,202,64,1)",
    fontSize: 200,
    height: 218,
    width: 200,
    marginTop: 16,
    alignSelf: "center",
  },
  iconHappy: {
    color: "rgba(62,136,91,1)",
    fontSize: 200,
    height: 218,
    width: 200,
    marginTop: 16,
    alignSelf: "center",
  },
  button2: {
    width: 250,
    height: 50,
    backgroundColor: "#CBC3E3",
    // borderWidth: 3,
    // borderColor: "rgba(74,144,226,1)",
    borderRadius: 30,
    marginTop: 30,
    alignSelf: "center",
  },
  addMood: {
    color: "#800080",
    fontSize: 25,
    marginTop: 6,
    alignSelf: "center",
    fontWeight: "bold",
  },
  group: {
    width: 100,
    height: 144,
  },
  rect3: {
    width: 100,
    height: 100,
    backgroundColor: "rgba(251,250,248,1)",
    // borderWidth: 3,
    // borderColor: "rgba(74,144,226,1)",
    borderRadius: 30,
  },
  icon2: {
    color: "#CBC3E3",
    fontSize: 70,
    height: 76,
    width: 70,
    marginTop: 10,
    alignSelf: "center",
  },
  iconSadPast: {
    color: "rgba(223,41,53,1)",
    fontSize: 70,
    height: 76,
    width: 70,
    marginTop: 10,
    alignSelf: "center",
  },
  iconNeutralPast: {
    color: "rgba(253,202,64,1)",
    fontSize: 70,
    height: 76,
    width: 70,
    marginTop: 10,
    alignSelf: "center",
  },
  iconHappyPast: {
    color: "rgba(62,136,91,1)",
    fontSize: 70,
    height: 76,
    width: 70,
    marginTop: 10,
    alignSelf: "center",
  },
  button: {
    width: 90,
    height: 30,
    backgroundColor: "#800080",
    // borderWidth: 3,
    // borderColor: "rgba(74,144,226,1)",
    borderRadius: 30,
    marginTop: 14,
    marginLeft: 5,
  },
  editMood: {
    color: "#CBC3E3",
    fontSize: 15,
    marginTop: 4,
    alignSelf: "center",
    fontWeight: "bold",
  },
  group1: {
    width: 100,
    height: 144,
    marginLeft: 15,
  },
  rect4: {
    width: 100,
    height: 100,
    backgroundColor: "rgba(251,250,248,1)",
    // borderWidth: 3,
    // borderColor: "rgba(74,144,226,1)",
    borderRadius: 30,
  },
  // icon3: {
  //   color: "rgba(128,128,128,1)",
  //   fontSize: 70,
  //   height: 76,
  //   width: 70,
  //   marginTop: 10,
  //   alignSelf: "center"
  // },
  button3: {
    width: 90,
    height: 30,
    backgroundColor: "#800080",
    // borderWidth: 3,
    // borderColor: "rgba(74,144,226,1)",
    borderRadius: 30,
    marginTop: 14,
    marginLeft: 5,
  },
  editMood1: {
    color: "rgba(74,144,226,1)",
    fontSize: 15,
    marginTop: 6,
    marginLeft: 11,
  },
  group2: {
    width: 100,
    height: 144,
    marginLeft: 15,
  },
  rect5: {
    width: 100,
    height: 100,
    backgroundColor: "rgba(251,250,248,1)",
    // borderWidth: 3,
    // borderColor: "rgba(74,144,226,1)",
    borderRadius: 30,
  },
  // icon4: {
  //   color: "rgba(128,128,128,1)",
  //   fontSize: 70,
  //   height: 76,
  //   width: 70,
  //   marginTop: 10,
  //   alignSelf: "center"
  // },
  button4: {
    width: 90,
    height: 30,
    backgroundColor: "#800080",
    // borderWidth: 3,
    // borderColor: "rgba(74,144,226,1)",
    borderRadius: 30,
    marginTop: 14,
    marginLeft: 5,
  },
  editMood2: {
    color: "rgba(74,144,226,1)",
    fontSize: 15,
    marginTop: 6,
    marginLeft: 11,
  },
  groupRow: {
    height: 144,
    flexDirection: "row",
    marginTop: 60,
    marginLeft: 15,
    marginRight: 15,
    alignSelf: "center",
  },
});

export default MoodTracker;
