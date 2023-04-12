import * as React from "react";
import { Appbar, Drawer } from "react-native-paper";
import { View, Text } from "react-native";

export function AppBar(props) {
  function menuClick() {
    props.visible = !props.visible;
    console.log(props.visible);
  }

  return (
    <View>
      <Appbar.Header>
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
          {/* <Appbar.Content title="Title" style={{}} /> */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Title
          </Text>
          <Appbar.Action icon="chat-outline" onPress={() => {}} />
        </View>
      </Appbar.Header>
    </View>
  );
}
