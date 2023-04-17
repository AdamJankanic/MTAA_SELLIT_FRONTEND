import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import { Card, IconButton } from "react-native-paper";

import { useSelector } from "react-redux";

export function OfferDetail() {
  const activeOffer = useSelector((state) => state.offerStore.activeOffer);

  const offer = useSelector((state) => state.offerStore.offers).filter(
    (offer) => {
      return offer.id === activeOffer;
    }
  );

  // const offer = allOffers.find((offer) => offer.id === activeOffer);

  console.log("activeOffer detail", activeOffer);
  // console.log("allOffers", allOffers);
  console.log("offer", offer);

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
          {offer[0].title}
        </Text>
      </View>
      <Card style={{ marginBottom: 15 }}>
        <Card.Cover source={{ uri: offer[0].image }} />
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
            {offer[0].location}, 048 07
          </Text>
        </View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          {offer[0].price}$
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
          {offer[0].description}
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
