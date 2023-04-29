import * as React from "react";
import { View, Text, Button, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch, useSelector } from "react-redux";
import { setActiveScreen } from "../reducers/ComponentsReducer";
import { OfferEdit } from "./OfferEdit";

import axiosConfig from "../axiosConfig";

export function ProfilePage() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [myOffers, setMyOffers] = React.useState(null);
  const user = useSelector((state) => state.componentsStore.user);
  const activeScreen = useSelector(
    (state) => state.componentsStore.activeScreen
  );

  React.useEffect(() => {
    // console.log("som tu profile page");

    async function getMyOffer() {
      try {
        // const offers = await AsyncStorage.getItem("offers").then((res) => {
        //   setMyOffers(JSON.parse(res));
        // });

        axiosConfig.get(`/offers?user_id=${user.id}`).then((res) => {
          // console.log("res get my offers", res.data.items);
          setMyOffers(res.data.items);
        });
      } catch (error) {
        console.log("error get my offers", error);
      }
    }

    getMyOffer();
  }, [activeScreen]);

  console.log("my offers", myOffers);
  async function logout() {
    console.log("logout");

    try {
      await axiosConfig.delete("/logout").then((res) => {
        console.log("res logou", res);
        AsyncStorage.removeItem("token");
        dispatch(setActiveScreen("LoginPage"));
        navigation.navigate("LoginPage");
      });
    } catch (error) {
      console.log("error logou", error);
    }
  }

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

      <Text>ProfilePage</Text>

      <Button title="Logout" onPress={logout}></Button>

      <ScrollView
        style={{
          paddingTop: 20,
          width: "100%",
        }}
      >
        {myOffers
          ?.filter((offer) => offer.user.id === user.id)
          ?.map((offer) => {
            return <OfferEdit key={offer.id} offer={offer} />;
          })}
      </ScrollView>
    </View>
  );
}
