import * as React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";

import { Searchbar } from "react-native-paper";

import { Chat } from "./Chat";

import { useDispatch, useSelector } from "react-redux";
import { addChannel } from "../reducers/MessagesReducer";

export function Chats() {
  const dispatch = useDispatch();

  let channels = useSelector((state) => state.messagesStore.channels);
  const messages = useSelector((state) => state.messagesStore.messages);
  let [displayChannels, setDisplayChannels] = React.useState(channels);

  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  // displayChannels = channels.filter((channel) => {
  //   return channel.title.toLowerCase().includes(searchQuery.toLowerCase());
  // });

  displayChannels = displayChannels.filter((channel) => {
    return channel.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  function handleBuy() {
    setDisplayChannels(
      channels.filter((channel) => {
        return channel.myOffer === false;
      })
    );
  }

  function handleSell() {
    setDisplayChannels(
      channels.filter((channel) => {
        return channel.myOffer === true;
      })
    );
  }

  return (
    <View
      style={{
        backgroundColor: "white",
      }}
    >
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{
          margin: 5,
          backgroundColor: "white",
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          // marginBottom: 0,
          backgroundColor: "white",
        }}
      >
        <Pressable style={styles.button} onPress={handleBuy}>
          <Text style={styles.text}>Buy</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleSell}>
          <Text style={styles.text}>Sell</Text>
        </Pressable>
      </View>

      <ScrollView
        style={{
          // backgroundColor: "red",
          height: "85%",
        }}
      >
        {displayChannels.map((channelKey, index) => {
          return <Chat key={index} channelProp={channelKey} />;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
  },
  text: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
});
