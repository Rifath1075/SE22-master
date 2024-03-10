import React, { Component } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import type { Node } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const TicketMenu = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Tickets")}
      >
        <Text style={styles.text}>View Tickets</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TicketMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CBC3E3",
  },
  button: {
    backgroundColor: "#800080",
    width: 300,
    height: 50,
    borderRadius: 30,
    marginTop: 30,
    justifyContent: "center",
    alignSelf: "center",
  },
  text: {
    fontSize: 20,
    alignSelf: "center",
    color: "#CBC3E3",
    fontWeight: "bold",
  },
});
