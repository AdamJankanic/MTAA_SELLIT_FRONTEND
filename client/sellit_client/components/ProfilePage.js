import * as React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch, useSelector } from "react-redux";
import { setActiveScreen } from "../reducers/ComponentsReducer";

import axiosConfig from "../axiosConfig";

export function ProfilePage() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  async function logout() {
    console.log("logout");

    try {
      await axiosConfig.delete("/logout").then((res) => {
        console.log("res logou", res);
        AsyncStorage.removeItem("token");
        dispatch(setActiveScreen("LoginPage"));
        navigation.navigate("LoginPage");
      });
    } catch (error) {
      console.log("error logou", error);
    }
  }

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <Text>ProfilePage</Text>

      <Button title="Logout" onPress={logout}></Button>
    </View>
  );
}
