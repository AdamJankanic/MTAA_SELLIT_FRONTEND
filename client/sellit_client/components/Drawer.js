import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Drawer, Divider, List, IconButton } from "react-native-paper";

export function LeftDrawer() {
  const [active, setActive] = React.useState("");

  return (
    <View
      style={{
        flex: 0,
        width: 300,
        height: "100%",
        position: "absolute",
        top: 0,
        backgroundColor: "red",
        display: "none",
      }}
    >
      <Drawer.Section title="Some title">
        <Drawer.Item
          label="First Item"
          active={active === "first"}
          onPress={() => setActive("first")}
        />
        <Drawer.Item
          label="Second Item"
          active={active === "second"}
          onPress={() => setActive("second")}
        />
      </Drawer.Section>
    </View>
  );
}
