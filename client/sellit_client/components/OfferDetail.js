import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import { Card, IconButton } from "react-native-paper";
import * as React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBuyChannel, setActiveChannel } from "../reducers/MessagesReducer";
import { setActiveScreen } from "../reducers/ComponentsReducer";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosConfig from "../axiosConfig";

export function OfferDetail() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [token, setStoredData] = React.useState(null);

  useEffect(() => {
    retrieveToken();
  }, []);

  // Retrieve data from AsyncStorage
  const retrieveToken = async () => {
    try {
      const value = await AsyncStorage.getItem("token");

      setStoredData(value);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("token", token);

  const activeOffer = useSelector((state) => state.offerStore.activeOffer);
  const activeOfferDetail = useSelector(
    (state) => state.offerStore.activeOfferDetail
  );

  const buyChannels = useSelector((state) => state.messagesStore.buyChannels);

  const user = useSelector((state) => state.componentsStore.user);

  const cities = useSelector((state) => state.offerStore.cities);

  let location = null;
  cities.forEach((element) => {
    if (element.value === activeOfferDetail.city_id) {
      location = element.label;
      return;
    }
  });

  async function contactSeller() {
    console.log("contactSeller");
    console.log("activeOfferDetail", activeOfferDetail.id);
    try {
      await axiosConfig
        .post(`/offers/${activeOfferDetail.id}/chat`)
        .then((res) => {
          console.log("res activeofferdetail", res.data.response);

          if (
            buyChannels.find((channel) => channel.id !== res.data.response.id)
          ) {
            dispatch(addBuyChannel(res.data.response));
          }

          console.log("1");
          dispatch(setActiveChannel(res.data.response.id));
          console.log("2");
          dispatch(setActiveScreen("ChatDetail"));
          console.log("3");

          navigation.navigate("ChatDetailPage");
        });
    } catch (error) {
      console.log("error offer detail", error);
    }
  }

  console.log("activeOfferDetail", activeOfferDetail);
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
          backgroundColor:
            activeOfferDetail.user.id === user?.id || !token
              ? "rgba(0, 0, 0, 0.1)"
              : "black",
        }}
        onPress={() => {
          contactSeller();
        }}
        disabled={activeOfferDetail.user.id === user?.id || !token}
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
          {!token
            ? "You need to be logged in to contact seller"
            : activeOfferDetail.user.id === user?.id
            ? "You can't contact yourself"
            : "Contact Seller"}
        </Text>
      </Pressable>

      <View
        style={{
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "space-between",
          marginTop: 15,
          backgroundColor: "white",
          width: "50%",

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.43,
          shadowRadius: 9.51,
          elevation: 5,

          borderRadius: 20,

          // borderWidth: 5,
        }}
      >
        <Image
          source={{ uri: activeOfferDetail.user.image_url }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {activeOfferDetail.user.username}
        </Text>
      </View>
    </View>
  );
}
