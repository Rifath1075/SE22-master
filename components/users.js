import React, { useState, useEffect, Component } from "react";
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
import { db } from "../bookingFire";
import type { Node } from "react";
import User from "./user";

const Users = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const ref = db.collection("users");
    ref.onSnapshot((query) => {
      const objs = [];
      query.forEach((doc) => {
        objs.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUsers(objs);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.table}>
        <Text style={styles.username}>Email</Text>
        <Text style={styles.datecreated}>Date Created</Text>
        <Text style={styles.view}>View</Text>
      </View>
      {users.map((users) => (
        <View style={styles.entries} key={users.uid}>
          <Text style={styles.uEntry}>{users.email}</Text>
          <Text style={styles.dEntry}>{users.created}</Text>

          <TouchableOpacity
            title="Edit"
            style={styles.button}
            onPress={() => {
              navigation.navigate("User", { users });
            }}
          >
            <Text style={styles.buttontext}>View</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default Users;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#800080",
  },
  username: {
    width: "30%",
    textAlignVertical: "center",
    color: "#800080",
    fontSize: 20,
  },
  datecreated: {
    width: "45%",
    textAlignVertical: "center",
    color: "#800080",
    fontSize: 20,
  },
  uEntry: {
    width: "30%",
    textAlignVertical: "center",
    color: "#800080",
  },
  dEntry: {
    width: "45%",
    textAlignVertical: "center",
    color: "#800080",
    fontSize: 20,
  },
  view: {
    width: "45%",
    textAlignVertical: "center",
    color: "#800080",
    fontSize: 20,
  },
  table: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 60,
    textAlignVertical: "center",
    backgroundColor: "#CBC3E3",
  },
  entries: {
    display: "flex",
    flexDirection: "row",
    height: 60,
    textAlignVertical: "center",
    backgroundColor: "#CBC3E3",
    marginTop: 15,
  },
  button: {
    backgroundColor: "#800080",
    flex: 0,
    marginTop: 12.5,
    height: 35,
    width: 80,
    textAlignVertical: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  buttontext: {
    color: "#CBC3E3",
    fontSize: 18,
    fontWeight: "700",
  },
});
