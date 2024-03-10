import * as React from "react";
import { Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import DietTracker from "./screens/DietTracker";
import MoodTracker from "./screens/MoodTracker";
import Dashboard from "./screens/MainPage";
import Booking from "./screens/Booking";
import ViewBooking from "./screens/ViewBooking";
import ManageBooking from "./screens/ManageBooking";
import ChatLogin from "./components/ChatLogin";
import Chat from "./components/Chat";
import Login from "./screens/login";
import Signup from "./screens/signup";

import CreateUser from "./components/create-user";
import Users from "./components/users";
import AdminMenu from "./components/admin-menu";
import UserMenu from "./components/user-menu";
import User from "./components/user";
import Bugs from "./components/bugs";
import Bug from "./components/bug";
import BugMenu from "./components/bug-menu";
import CreateBug from "./components/create-bug.js";
import TicketMenu from "./components/ticket-main.js";
import CreateTicket from "./components/create-ticket.js";
import Tickets from "./components/tickets.js";
import singleTicket from "./components/singleTicket.js";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#800080",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: "Signup" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={({ title: "Login" }, { headerLeft: null })}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={({ title: "Dashboard" }, { headerLeft: null })}
      />
      <Stack.Screen
        name="MoodTracker"
        component={MoodTracker}
        options={({ title: "MoodTracker" }, { headerLeft: null })}
      />
      <Stack.Screen
        name="DietTracker"
        component={DietTracker}
        options={({ title: "DietTracker" }, { headerLeft: null })}
      />
      <Stack.Screen
        name="Booking"
        component={Booking}
        options={({ title: "Booking" }, { headerLeft: null })}
      />
      <Stack.Screen
        name="ViewBooking"
        component={ViewBooking}
        options={({ title: "ViewBooking" }, { headerLeft: null })}
      />
      <Stack.Screen
        name="ManageBooking"
        component={ManageBooking}
        options={({ title: "ManageBooking" }, { headerLeft: null })}
      />
      <Stack.Screen
        name="ChatLogin"
        component={ChatLogin}
        options={({ title: "ChatLogin" }, { headerLeft: null })}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={({ title: "Chat" }, { headerLeft: null })}
      />
      <Stack.Screen name="Admin Menu" component={AdminMenu} />
      <Stack.Screen name="User Menu" component={UserMenu} />
      <Stack.Screen name="Users" component={Users} />
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="Create User" component={CreateUser} />
      <Stack.Screen name="Bugs" component={Bugs} />
      <Stack.Screen name="Bug" component={Bug} />
      <Stack.Screen name="Bug Menu" component={BugMenu} />
      <Stack.Screen name="Report Bug" component={CreateBug} />
      <Stack.Screen name="Ticket Menu" component={TicketMenu} />
      <Stack.Screen name="Create Ticket" component={CreateTicket} />
      <Stack.Screen name="Tickets" component={Tickets} />
      <Stack.Screen name="Ticket" component={singleTicket} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
