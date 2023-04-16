import * as React from "react";
import { View, ScrollView, Text } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { Offer } from "./Offer";

export function SearchPage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View>
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
          // alignSelf: "center",
          // alignContent: "space-between",
          justifyContent: "space-around",
          // gap: 10,
          display: "none",
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            alignSelf: "center",
            justifyContent: "flex-start",
          }}
        >
          Search string || Category name
        </Text>

        <IconButton
          icon="filter"
          style={{
            justifyContent: "flex-end",
            // backgroundColor: "red",
          }}
        ></IconButton>
      </View>
      <ScrollView>
        <Offer />
        <Offer />
        <Offer />
      </ScrollView>
    </View>
  );
}
