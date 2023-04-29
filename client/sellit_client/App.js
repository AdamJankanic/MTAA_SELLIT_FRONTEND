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
import { LeftDrawer } from "./components/Drawer";
import { HomePage } from "./components/HomePage.js";
import { AddPage } from "./components/AddPage.js";
import { Chats } from "./components/Chats.js";
import { SearchPage } from "./components/SearchPage.js";
import { ChatDetail } from "./components/ChatDetail.js";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { OfferDetail } from "./components/OfferDetail.js";

import { MapPage } from "./components/MapPage.js";
import { MapRoute } from "./components/MapRoute.js";

import { LoginPage } from "./components/LoginPage.js";
import { RegisterPage } from "./components/RegisterPage.js";
import { ProfilePage } from "./components/ProfilePage.js";
import { OfferEditForm } from "./components/OfferEditForm.js";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const store = configureStore({
  reducer: rootReducer,
});

//notifications
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
      console.log("final status", finalStatus);
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("expo token", token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = React.useState("");
  const [notification, setNotification] = React.useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  React.useEffect(() => {
    console.log("app.js useeffect");
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);

      AsyncStorage.setItem("expoPushToken", token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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
              component={ProfilePage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChatPage"
              component={Chats}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChatDetailPage"
              component={ChatDetail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OfferDetailPage"
              component={OfferDetail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MapPage"
              component={MapRoute}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoginPage"
              component={LoginPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RegisterPage"
              component={RegisterPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OfferEdit"
              component={OfferEditForm}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
          <BottomNav />
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
}
