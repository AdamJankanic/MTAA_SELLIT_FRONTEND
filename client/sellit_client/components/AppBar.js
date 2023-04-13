import * as React from "react";
import { Appbar, Drawer } from "react-native-paper";
import { View, Text } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { drawerOpen } from "../reducers/ComponentsReducer";
import { useNavigation } from "@react-navigation/native";

export function AppBar() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const drawer = useSelector((state) => state.componentsStore.drawer);

  function menuClick() {
    console.log("drawer", drawer);
    dispatch(drawerOpen());
  }

  function chatClick() {
    console.log("chat");
    //navigate to add page
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
            Title
          </Text>
          <Appbar.Action icon="chat-outline" onPress={chatClick} />
        </View>
      </Appbar.Header>
    </View>
  );
}
