import * as React from "react";
import { Button, Provider as PaperProvider } from "react-native-paper";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { AppBar } from "./components/AppBar";
import { BottomNav } from "./components/BottomNav";
import { NavigationContainer } from "@react-navigation/native";
import { LeftDrawer } from "./components/Drawer";

export default function App() {
  const [visible, setVisible] = React.useState(false);
  console.log("visible", visible);
  return (
    <NavigationContainer>
      <PaperProvider>
        <AppBar visible={visible} />

        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <BottomNav />
          <LeftDrawer />
        </View>
      </PaperProvider>
    </NavigationContainer>
  );
}
