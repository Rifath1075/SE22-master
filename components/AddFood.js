import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { SliderPicker } from "react-native-slider-picker";

class AddMood extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      clicked: false,
    };
    this.cancelClick = this.cancelClick.bind(this);
    this.submitClick = this.submitClick.bind(this);
  }

  cancelClick() {
    this.setState({
      value: 0,
      clicked: false,
    });
    this.props.cancel();
  }

  submitClick() {
    if (this.state.value === 0) {
      alert("Please enter calories!");
    } else {
      this.props.confirm(this.state.value);
      this.setState({
        value: 0,
        clicked: false,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rect}>
          <View style={styles.button3Row}>
            <SliderPicker
              maxValue={300}
              callback={(position) => {
                this.setState({ value: position });
              }}
              defaultValue={this.state.value}
              showFill={true}
              fillColor={"rgba(0,255,0,1)"}
              sliderInnerBackgroundColor={"rgba(255,0,0,1)"}
              buttonBackgroundColor={"#800080"}
              buttonBorderColor={"#CBC3E3"}
              buttonBorderWidth={3}
              buttonDimensionsPercentage={5}
              widthPercentage={50}
            />
            <Text style={styles.calories}>
              Calories: {this.state.value}kcal
            </Text>
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
  calories: {
    color: "#800080",
    fontSize: 15,
    alignSelf: "center",
    fontWeight: "bold",
  },
  rect: {
    marginTop: -190,
    width: 250,
    height: 130,
    backgroundColor: "rgba(251,250,248,1)",
    borderRadius: 30,
    alignSelf: "center",
  },
  button3Row: {
    height: 50,
    alignSelf: "center",
  },
  button: {
    width: 85,
    height: 30,
    backgroundColor: "#800080",
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
    marginTop: 39,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default AddMood;
