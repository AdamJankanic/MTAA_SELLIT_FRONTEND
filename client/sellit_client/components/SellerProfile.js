import * as React from "react";
import { View, Text, Button, Image, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch, useSelector } from "react-redux";
import { setActiveScreen } from "../reducers/ComponentsReducer";
import { Offer } from "./Offer";

import axiosConfig from "../axiosConfig";

export function SellerProfile() {
  const [sellerOffers, setSellerOffers] = React.useState(null);
  const user = useSelector((state) => state.offerStore.sellerProfile);
  const activeScreen = useSelector(
    (state) => state.componentsStore.activeScreen
  );

  React.useEffect(() => {
    // console.log("som tu profile page");

    async function getSellerOffers() {
      try {
        axiosConfig.get(`/offers?user_id=${user.id}`).then((res) => {
          // console.log("res get my offers", res.data.items);
          setSellerOffers(res.data.items);
        });
      } catch (error) {
        console.log("error get my offers", error);
      }
    }

    getSellerOffers();
  }, [activeScreen]);

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        // flex: 1,
        backgroundColor: "white",

        width: "100%",
        height: "100%",
      }}
    >
      <Image
        style={{ width: 100, height: 100, borderRadius: 50 }}
        source={{ uri: user.image_url }}
      />

      <Text>{user.username}</Text>

      {/* <Button title="Logout" onPress={logout}></Button> */}

      <ScrollView
        style={{
          paddingTop: 20,
          width: "100%",
        }}
      >
        {sellerOffers?.map((offer) => {
          return <Offer key={offer.id} offer={offer} />;
        })}
      </ScrollView>
    </View>
  );
}
