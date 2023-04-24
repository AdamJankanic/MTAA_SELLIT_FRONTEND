import * as React from "react";
import { View, ScrollView, Text } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { Offer } from "./Offer";

import { useSelector } from "react-redux";

export function SearchPage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  let allOffers = useSelector((state) => state.offerStore.offers);

  const onChangeSearch = (query) => setSearchQuery(query);

  allOffers = allOffers.filter((offer) => {
    return offer.title.toLowerCase().includes(searchQuery.toLowerCase());
    // ||
    // offer.location.toLowerCase().includes(searchQuery.toLowerCase())
  });

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
      <ScrollView
        style={{
          height: "90%",
          backgroundColor: "white",
        }}
      >
        {allOffers.map((offer, index) => (
          <Offer key={index} offer={offer} />
        ))}
      </ScrollView>
    </View>
  );
}
