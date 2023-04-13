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

export function Chats() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

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
        }}
      >
        <Pressable style={styles.button}>
          <Text style={styles.text}>Buy</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.text}>Sell</Text>
        </Pressable>
      </View>

      <ScrollView>
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
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
