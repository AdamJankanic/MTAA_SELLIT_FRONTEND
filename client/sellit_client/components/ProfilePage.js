import * as React from "react";
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch, useSelector } from "react-redux";
import { setActiveScreen } from "../reducers/ComponentsReducer";
import { OfferEdit } from "./OfferEdit";

import axiosConfig from "../axiosConfig";
import NetInfo from "@react-native-community/netinfo";
export function ProfilePage() {
  const dispatch = useDispatch();

  const [connection, setConnection] = React.useState(false);

  NetInfo.fetch().then((state) => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
    setConnection(state.isConnected);
  });

  const navigation = useNavigation();

  const [myOffers, setMyOffers] = React.useState(null);
  const user = useSelector((state) => state.componentsStore.user);
  const activeScreen = useSelector(
    (state) => state.componentsStore.activeScreen
  );

  React.useEffect(() => {
    // console.log("som tu profile page");

    if (!connection) {
      AsyncStorage.getItem("myOffers").then((res) => {
        setMyOffers(JSON.parse(res));
      });

      return;
    }

    async function getMyOffer() {
      try {
        // const offers = await AsyncStorage.getItem("offers").then((res) => {
        //   setMyOffers(JSON.parse(res));
        // });

        axiosConfig.get(`/offers?user_id=${user.id}`).then((res) => {
          // console.log("res get my offers", res.data.items);
          setMyOffers(res.data.items);

          AsyncStorage.setItem("myOffers", JSON.stringify(res.data.items));
        });
      } catch (error) {
        console.log("error get my offers", error);
      }
    }

    getMyOffer();
  }, [activeScreen]);

  console.log("my offers", myOffers);
  async function logout() {
    if (!connection) {
      Alert.alert("You are offline, you can't logout");
      return;
    }

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

      {/* <Button title="Logout" onPress={logout}></Button> */}

      <View
        style={{
          flexDirection: "row",

          width: "80%",
          justifyContent: "space-around",
        }}
      >
        <Pressable
          style={{
            backgroundColor: "black",
            padding: 10,
            margin: 10,
            borderRadius: 10,
            width: "35%",
          }}
          onPress={() => {
            if (!connection) {
              Alert.alert("You are offline, you can't edit profile");
              return;
            }
            navigation.navigate("ProfileEditPage");
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Edit
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "black",
            padding: 10,
            margin: 10,
            borderRadius: 10,
            width: "35%",
          }}
          onPress={logout}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Logout
          </Text>
        </Pressable>
      </View>
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
