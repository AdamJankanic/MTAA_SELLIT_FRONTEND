import * as React from "react";
import { View, ScrollView } from "react-native";
import { Searchbar } from "react-native-paper";
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

      <ScrollView>
        <Offer />
        <Offer />
        <Offer />
      </ScrollView>
    </View>
  );
}
