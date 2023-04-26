import * as React from "react";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { TextInput } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { setActiveScreen } from "../reducers/ComponentsReducer";

import AsyncStorage from "@react-native-async-storage/async-storage";

import axiosCongig from "../axiosConfig";

export function LoginPage() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // const user = useSelector((state) => state.componentsStore.user);

  function goRegister() {
    navigation.navigate("RegisterPage");
  }

  async function handleLogin() {
    console.log("login");

    if (!email || !password) {
      console.log("please fill all fields");
      return;
    }

    try {
      await axiosCongig
        .post("/auth", {
          email: email,
          password: password,
        })

        .then((res) => {
          console.log("res token", res.data.response.token);

          try {
            AsyncStorage.setItem("token", res.data.response.token);
            console.log("token set");
            dispatch(setActiveScreen("HomePage"));
            navigation.navigate("HomePage");
          } catch (e) {
            console.log("error login", e);
          }
        });
    } catch (error) {
      console.log("error login", error);
    }
  }

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "80%",

        gap: 20,
      }}
    >
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
        }}
      >
        Login
      </Text>
      <TextInput
        placeholder="Email"
        mode="outlined"
        onChangeText={(text) => setEmail(text)}
        value={email}
        style={{
          width: "80%",
        }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        mode="outlined"
        onChangeText={(text) => setPassword(text)}
        value={password}
        style={{
          width: "80%",
        }}
      />

      <Text
        style={{
          color: "red",
          fontWeight: "bold",
          fontSize: 16,
          display: email && password ? "none" : "flex",
        }}
      >
        Please fill all fields.
      </Text>

      <Button title="Login" onPress={handleLogin} />
      <Pressable onPress={goRegister}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            textDecorationLine: "underline",
          }}
        >
          Don't have an account? Go to register page.
        </Text>
      </Pressable>
    </View>
  );
}
