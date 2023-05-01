import * as React from "react";
import { Appbar, Drawer } from "react-native-paper";
import { View, Text, Alert } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { drawerOpen, setActiveScreen } from "../reducers/ComponentsReducer";
import { useNavigation } from "@react-navigation/native";


import {
  addBuyChannel,
  addSellChannel,
  resetChannels,
} from "../reducers/MessagesReducer";
import axiosConfig from "../axiosConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
export function AppBar() {
  const [connection, setConnection] = React.useState(false);

  NetInfo.fetch().then((state) => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
    setConnection(state.isConnected);
  });

  const [token, setStoredData] = React.useState(null);
  const activeScreen = useSelector(
    (state) => state.componentsStore.activeScreen
  );
  React.useEffect(() => {
    retrieveToken();
  }, [activeScreen]);

  // Retrieve data from AsyncStorage
  const retrieveToken = async () => {
    try {
      const value = await AsyncStorage.getItem("token");

      setStoredData(value);
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const drawer = useSelector((state) => state.componentsStore.drawer);

  const user = useSelector((state) => state.componentsStore.user);

  function menuClick() {
    console.log("drawer", drawer);
    dispatch(drawerOpen());
  }

  async function chatClick() {
    if (!connection) {
      Alert.alert("No internet connection");
      return;
    }

    if (!token) {
      dispatch(setActiveScreen("LoginPage"));
      navigation.navigate("LoginPage");
      return;
    }

    try {
      await axiosConfig.get(`/users/${user.id}/chats`).then((res) => {
        console.log("res buy chats", res.data);

        dispatch(resetChannels());
        res.data.items.forEach((channel) => {
          dispatch(addBuyChannel(channel));
        });
      });
    } catch (error) {
      console.log("error app bar buy chats", error);
    }

    try {
      await axiosConfig
        .get(`/users/${user.id}/chats?owner="True"`)
        .then((res) => {
          console.log("res sell chats", res.data);

          res?.data?.items?.forEach((channel) => {
            dispatch(addSellChannel(channel));
          });
        });
    } catch (error) {
      console.log("error app bar sell chats", error);
    }

    dispatch(setActiveScreen("ChatPage"));
    navigation.navigate("ChatPage");
  }

  return (
    <View>
      <Appbar.Header
        style={{
          backgroundColor: "white",
        }}
      >
        {/* <Appbar.BackAction onPress={() => {}} /> */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Appbar.Action icon="menu" onPress={menuClick} />

          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Sell It
          </Text>
          <Appbar.Action icon="chat-outline" onPress={chatClick} />
        </View>
      </Appbar.Header>
    </View>
  );
}
