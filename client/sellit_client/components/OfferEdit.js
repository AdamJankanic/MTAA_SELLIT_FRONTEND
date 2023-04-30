import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Card } from "react-native-paper";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditOffer,
  setEditOfferDetail,
  resetActiveOfferDetail,
} from "../reducers/OfferReducer";

import { setActiveScreen } from "../reducers/ComponentsReducer";

import axiosConfig from "../axiosConfig";
import NetInfo from "@react-native-community/netinfo";
export function OfferEdit(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [connection, setConnection] = React.useState(false);

  NetInfo.fetch().then((state) => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
    setConnection(state.isConnected);
  });

  // const activeOfferS = useSelector((state) => state.offerStore.activeOffer);
  // console.log("activeOfferSssssssssssssssssssssss", activeOfferS);

  //all cities from redux
  const cities = useSelector((state) => state.offerStore.cities);

  let location = null;
  cities.forEach((element) => {
    if (element.value === props.offer.city_id) {
      location = element.label;
      return;
    }
  });

  async function handleOfferClick() {
    //check connection
    if (!connection) {
      Alert.alert("No internet connection");
      return;
    }
    //set active offer
    dispatch(setEditOffer(props.offer.id));
    dispatch(resetActiveOfferDetail());

    const res = await axiosConfig.get(`/offers/${props.offer.id}`);

    dispatch(setEditOfferDetail(res.data.response));

    dispatch(setActiveScreen("OfferEdit"));

    navigation.navigate("OfferEdit");
  }

  // console.log("props.offer.images", props.offer.images[0]);

  return (
    <TouchableOpacity onPress={handleOfferClick}>
      <View
        style={{
          backgroundColor: "white",
          /* positioning */
          margin: 5,
          padding: 15,
          /* box shadow */
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.43,
          shadowRadius: 9.51,
          elevation: 5,

          /* border */
          borderRadius: 25,
          width: "95%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 15,
            marginBottom: 10,
          }}
        >
          <Image
            style={{ width: 50, height: 50, borderRadius: 50 }}
            // source={{ uri: "https://picsum.photos/200" }}
            source={{ uri: props.offer.user["image_url"] }}
          />
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              {props.offer.user["username"]}
            </Text>
            <Text>{location}</Text>
          </View>
        </View>
        <Card style={{ marginBottom: 15 }}>
          <Card.Cover
            source={{
              // uri: "https://picsum.photos/700"
              uri:
                props.offer.images.length > 0
                  ? props.offer.images[0]["url"]
                  : "https://picsum.photos/700",
            }}
          />
        </Card>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          {props.offer.title}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          {props.offer.price}$
        </Text>
      </View>
    </TouchableOpacity>
  );
}
