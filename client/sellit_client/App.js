import "react-native-gesture-handler";
import * as React from "react";
import { Button, Provider as PaperProvider } from "react-native-paper";

// redux state management
import { Provider as StoreProvider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index.js";
//////////////////////////////////////////////////////////

import { AppBar } from "./components/AppBar";
import { BottomNav } from "./components/BottomNav";
import { NavigationContainer } from "@react-navigation/native";
import { LeftDrawer } from "./components/Drawer";
import { HomePage } from "./components/HomePage.js";
import { AddPage } from "./components/AddPage.js";
import { Chats } from "./components/Chats.js";
import { SearchPage } from "./components/SearchPage.js";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const store = configureStore({
  reducer: rootReducer,
});

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <AppBar />
          <LeftDrawer />
          <Stack.Navigator>
            <Stack.Screen
              name="HomePage"
              component={HomePage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddPage"
              component={AddPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SearchPage"
              component={SearchPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProfilePage"
              component={HomePage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChatPage"
              component={Chats}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
          <BottomNav />
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
}
