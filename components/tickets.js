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
import { db } from "../adminFire";
import type { Node } from "react";
import singleTicket from "./singleTicket.js";

const Tickets = ({ navigation }) => {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    const ref = db.collection("tickets");
    ref.onSnapshot((query) => {
      const objs = [];
      query.forEach((doc) => {
        objs.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setTickets(objs);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.table}>
        <Text style={styles.username}>Ticket Title</Text>
        <Text style={styles.datecreated}>Date Reported</Text>
        <Text style={styles.view}>View</Text>
      </View>
      {tickets.map((tickets) => (
        <View style={styles.entries} key={tickets.id}>
          <Text style={styles.uEntry}>{tickets.Title}</Text>
          <Text style={styles.dEntry}>{tickets.Date}</Text>

          <TouchableOpacity
            title="Edit"
            style={styles.button}
            onPress={() => {
              navigation.navigate("Ticket", { tickets });
            }}
          >
            <Text style={styles.buttontext}>View</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default Tickets;
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
    fontSize: 20,
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
