import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import { Card, IconButton } from "react-native-paper";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export function OfferDetail() {
  const activeOffer = useSelector((state) => state.offerStore.activeOffer);

  const activeOfferDetail = useSelector(
    (state) => state.offerStore.activeOfferDetail
  );
  console.log("activeOfferDetail", activeOfferDetail);

  const cities = useSelector((state) => state.offerStore.cities);

  let location = null;
  cities.forEach((element) => {
    if (element.value === activeOfferDetail.city_id) {
      location = element.label;
      return;
    }
  });

  return (
    <View
      style={{
        backgroundColor: "white",
        /* positioning */
        // margin: 5,
        padding: 15,
        height: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 15,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
          }}
        >
          {activeOfferDetail.title}
        </Text>

        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Views: {activeOfferDetail.views}
        </Text>
      </View>
      <Card style={{ marginBottom: 15 }}>
        <Card.Cover
          source={{
            uri: activeOfferDetail.images[0]["url"],
          }}
        />
      </Card>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          // backgroundColor: "red",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: -5,
            // marginBottom: 10,
            alignItems: "center",
          }}
        >
          <IconButton icon="map-marker" size={30}></IconButton>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            {location}
          </Text>
        </View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          {activeOfferDetail.price}$
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>
          {/* Description of the offer goes here and it can be very long. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl
          eget ultricies lacinia, nunc nisl aliquet nunc, eget aliquet nunc */}
          {activeOfferDetail.description}
        </Text>
      </View>

      <Pressable
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginTop: 10,
          borderRadius: 20,
          elevation: 3,
          backgroundColor: "black",
        }}
      >
        <Text
          style={{
            fontSize: 15,
            lineHeight: 20,
            fontWeight: "bold",
            letterSpacing: 0.25,
            color: "white",
          }}
        >
          Contact Seller
        </Text>
      </Pressable>
    </View>
  );
}
