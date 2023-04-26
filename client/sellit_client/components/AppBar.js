import * as React from "react";
import { Appbar, Drawer } from "react-native-paper";
import { View, Text } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { drawerOpen } from "../reducers/ComponentsReducer";
import { useNavigation } from "@react-navigation/native";

import { addChannel, resetChannels } from "../reducers/MessagesReducer";
import axiosConfig from "../axiosConfig";

export function AppBar() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const drawer = useSelector((state) => state.componentsStore.drawer);

  const user = useSelector((state) => state.componentsStore.user);

  function menuClick() {
    console.log("drawer", drawer);
    dispatch(drawerOpen());
  }

  async function chatClick() {
    console.log("chat");
    //navigate to add page
    try {
      // console.log("Chats useEffect", user);
      await axiosConfig
        .get(`/users/${user.id}/chats`)
        // .get(`/users/${user.id}/chats?owner="True"`)
        .then((res) => {
          // console.log("res", res.data.items);
          dispatch(resetChannels());

          res.data.items.forEach((channel) => {
            dispatch(addChannel(channel));
          });
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (error) {
      console.log("error", error.response.data);
    }

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
