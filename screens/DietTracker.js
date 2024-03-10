import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import TimeIcon from "react-native-vector-icons/Feather";
import AddFood from "../components/AddFood";

class MoodTracker extends Component {
  constructor() {
    super();
    this.state = {
      totalCal: 0,
      morningCal: 0,
      afternoonCal: 0,
      nightCal: 0,
      clicked: false,
    };
    this.addCurrent = this.addCurrent.bind(this);
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    var current = this.retrieveData("totalCal");
    var morning = this.retrieveData("morningCal");
    var afternoon = this.retrieveData("afternoonCal");
    var night = this.retrieveData("nightCal");
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
      this.setState({ clicked: true });
    }
  }

  confirm(calories) {
    this.setState((prevState) => ({
      totalCal: prevState.totalCal + calories,
    }));
    this.storeData("totalCal", this.state.totalCal);
    if (new Date().getHours() >= 6 && new Date().getHours() < 12) {
      this.setState((prevState) => ({
        morningCal: prevState.morningCal + calories,
      }));
      this.storeData("morningCal", this.state.morningCal);
    } else if (new Date().getHours() >= 12 && new Date().getHours() < 18) {
      this.setState((prevState) => ({
        afternoonCal: prevState.afternoonCal + calories,
      }));
      this.storeData("afternoonCal", this.state.afternoonCal);
    } else if (new Date().getHours() >= 18 || new Date().getHours() < 6) {
      this.setState((prevState) => ({
        nightCal: prevState.nightCal + calories,
      }));
      this.storeData("nightCal", this.state.nightCal);
    }
    this.setState({
      clicked: false,
    });
  }

  cancel() {
    this.setState({ clicked: false });
  }

  tintColor(current, total) {
    if (current > total) {
      return "rgba(255,0,0,1)";
    } else {
      return "rgba(0,255,0,1)";
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          {/* <Text style={styles.moodTracker}>Diet Tracker</Text> */}
          <View style={styles.rect}>
            <AnimatedCircularProgress
              rotation={0}
              size={250}
              width={30}
              fill={(this.state.totalCal * 100) / 2500}
              tintColor="rgba(251,250,248,1)"
              tintColorSecondary={this.tintColor(this.state.totalCal, 2500)}
              backgroundColor="#CBC3E3"
            >
              {(fill) => (
                <Text style={styles.totalCal}>{this.state.totalCal}/2500</Text>
              )}
            </AnimatedCircularProgress>
          </View>
          <TouchableOpacity onPress={this.addCurrent} style={styles.button2}>
            <Text style={styles.addMood}>Add Food</Text>
          </TouchableOpacity>
        </View>
        <View style={this.state.clicked ? styles.pop : styles.gone}>
          <AddFood confirm={this.confirm} cancel={this.cancel} />
        </View>
        <View style={styles.bottom}>
          <View style={styles.groupRow}>
            <View style={styles.group}>
              <TimeIcon name="sunrise" style={styles.timeIcon}></TimeIcon>
              <View style={styles.rect3}>
                <AnimatedCircularProgress
                  rotation={0}
                  size={100}
                  width={10}
                  fill={(this.state.morningCal * 100) / 500}
                  tintColor="rgba(251,250,248,1)"
                  tintColorSecondary={this.tintColor(
                    this.state.morningCal,
                    500
                  )}
                  backgroundColor="#800080"
                >
                  {(fill) => (
                    <Text style={styles.timeCal}>
                      {this.state.morningCal}/500
                    </Text>
                  )}
                </AnimatedCircularProgress>
              </View>
            </View>
            <View style={styles.group1}>
              <TimeIcon name="sun" style={styles.timeIcon}></TimeIcon>
              <View style={styles.rect4}>
                <AnimatedCircularProgress
                  rotation={0}
                  size={100}
                  width={10}
                  fill={(this.state.afternoonCal * 100) / 700}
                  tintColor="rgba(251,250,248,1)"
                  tintColorSecondary={this.tintColor(
                    this.state.afternoonCal,
                    700
                  )}
                  backgroundColor="#800080"
                >
                  {(fill) => (
                    <Text style={styles.timeCal}>
                      {this.state.afternoonCal}/700
                    </Text>
                  )}
                </AnimatedCircularProgress>
              </View>
            </View>
            <View style={styles.group2}>
              <TimeIcon name="sunset" style={styles.timeIcon}></TimeIcon>
              <View style={styles.rect5}>
                <AnimatedCircularProgress
                  rotation={0}
                  size={100}
                  width={10}
                  fill={(this.state.nightCal * 100) / 700}
                  tintColor="rgba(251,250,248,1)"
                  tintColorSecondary={this.tintColor(this.state.nightCal, 700)}
                  backgroundColor="#800080"
                >
                  {(fill) => (
                    <Text style={styles.timeCal}>
                      {this.state.nightCal}/700
                    </Text>
                  )}
                </AnimatedCircularProgress>
              </View>
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
    marginBottom: 30,
    alignSelf: "center",
  },
  gone: {
    display: "none",
  },
  pop: {
    display: "flex",
  },
  totalCal: {
    color: "#CBC3E3",
    fontSize: 30,
    fontWeight: "bold",
  },
  timeCal: {
    color: "#800080",
    fontSize: 15,
    fontWeight: "bold",
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
    borderRadius: 360,
    marginTop: 50,
    alignSelf: "center",
  },
  button2: {
    width: 250,
    height: 50,
    backgroundColor: "#CBC3E3",
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
    borderRadius: 360,
  },
  group1: {
    width: 100,
    height: 144,
    marginLeft: 15,
  },
  rect4: {
    width: 100,
    height: 100,
    borderRadius: 360,
  },
  group2: {
    width: 100,
    height: 144,
    marginLeft: 15,
  },
  rect5: {
    width: 100,
    height: 100,
    borderRadius: 360,
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
