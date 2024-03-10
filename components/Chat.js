// @flow
import React from "react";
import { GiftedChat } from "react-native-gifted-chat"; // 0.3.0
import { Alert } from "react-native";

import Fire from "../chatFire";

type Props = {
  name?: string,
};

class Chat extends React.Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("name"),
  });

  state = {
    messages: [],
  };

  get user() {
    return {
      name: this.props.route.params.name,
      _id: Fire.shared.uid,
    };
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.user}
      />
    );
  }

  componentDidMount() {
    Fire.shared.on((message) =>
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
    // Alert.alert(
    //   "Thank you for your message!",
    //   "A mental health champion will get back to you as soon as one is available."
    // );
  }
  componentWillUnmount() {
    Fire.shared.off();
  }
}

export default Chat;
