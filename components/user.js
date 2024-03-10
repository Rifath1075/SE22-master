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
} from "react-native";
import { db } from "../adminFire";
import type { Node } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

const User = ({ route, navigation }) => {
  var user = route.params.users;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>User ID: </Text>
      <TextInput
        style={styles.input}
        placeholder={user.uid.concat(" (Cannot be Modified)")}
      />
      <Text style={styles.text}>Username: </Text>
      <TextInput
        style={styles.input}
        placeholder={user.email.concat(" (Cannot be Modified)")}
      />
      <Text style={styles.text}>Date Created: </Text>
      <TextInput
        style={styles.input}
        placeholder={user.created.concat(" (Cannot be Modified)")}
      />
    </ScrollView>
  );
};

export default User;

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
});
