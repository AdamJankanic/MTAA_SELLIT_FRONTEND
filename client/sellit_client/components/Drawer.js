import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

import { useSelector, useDispatch } from "react-redux";
import { drawerOpen, drawerClose } from "../reducers/ComponentsReducer";

import { Drawer } from "react-native-drawer-layout";

import { createDrawerNavigator } from "@react-navigation/drawer";
const DrawerNavigator = createDrawerNavigator();

export function LeftDrawer() {
  const dispatch = useDispatch();
  const drawer = useSelector((state) => state.componentsStore.drawer);

  function openDrawer() {
    console.log("open", drawer);
    dispatch(drawerOpen());
  }

  function closeDrawer() {
    console.log("close", drawer);
    dispatch(drawerClose());
  }

  return (
    <Drawer
      open={drawer}
      onOpen={openDrawer}
      onClose={closeDrawer}
      renderDrawerContent={() => {
        return (
          <View>
            <Text>Category 1</Text>
            <Text>Category 2</Text>
            <Text>Category 3</Text>
            <Text>Category 4</Text>
            <Text>Category 5</Text>
            <Text>Category 6</Text>
            <Text>Category 7</Text>
            <Text>Category 8</Text>
            <Text>Category 9</Text>
            <Text>Category 10</Text>
            <Button>Confirm</Button>
          </View>
        );
      }}
      style={{
        flex: 1,
        zIndex: drawer ? 100 : 0,
        position: "absolute",
        top: 90,
        left: 0,
        width: "100%",
        height: "100%",
        // backgroundColor: "white",
      }}
    >
      {/* <Button
        onPress={drawerChange}
        title={`${drawer ? "Close" : "Open"} drawer`}
      >

      </Button> */}
    </Drawer>
  );
}
