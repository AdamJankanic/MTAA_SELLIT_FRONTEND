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
import { addChannel, resetChannels } from "../reducers/MessagesReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosConfig from "../axiosConfig";

export function Chats() {
  const dispatch = useDispatch();

  let buyChannels = useSelector((state) => state.messagesStore.buyChannels);
  let sellChannels = useSelector((state) => state.messagesStore.sellChannels);
  const messages = useSelector((state) => state.messagesStore.messages);
  let [displayChannels, setDisplayChannels] = React.useState(
    buyChannels.length > 0 ? buyChannels : sellChannels
  );

  const [activeButton, setActiveButton] = React.useState(
    buyChannels.length > 0 ? "buy" : "sell"
  );

  const user = useSelector((state) => state.componentsStore.user);

  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  displayChannels = displayChannels.filter((channel) => {
    return channel.offer.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  function handleBuy() {
    setActiveButton("buy");
    setDisplayChannels(buyChannels);
  }

  function handleSell() {
    setActiveButton("sell");
    setDisplayChannels(sellChannels);
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
        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: activeButton === "buy" ? "black" : "white",
            },
          ]}
          onPress={handleBuy}
        >
          <Text
            style={[
              styles.text,
              {
                color: activeButton === "buy" ? "white" : "black",
              },
            ]}
          >
            Buy
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: activeButton === "sell" ? "black" : "white",
            },
          ]}
          onPress={handleSell}
        >
          <Text
            style={[
              styles.text,
              {
                color: activeButton === "sell" ? "white" : "black",
              },
            ]}
          >
            Sell
          </Text>
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
