import * as React from "react";
import { Button, Provider as PaperProvider } from "react-native-paper";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { BottomNav } from "./components/BottomNav";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        {/* <View>
          <Text>Open up App.js to start working on your app!</Text>
          <StatusBar />
        </View> */}
        {/* <View>
          <Example />
        </View> */}
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <BottomNav />
        </View>
      </PaperProvider>
    </NavigationContainer>
  );
}
