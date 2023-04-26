import * as React from "react";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { TextInput } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { setUser } from "../reducers/ComponentsReducer";
import axiosCongig from "../axiosConfig";

export function RegisterPage() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  async function handleRegister() {
    console.log("register");

    if (password !== confirmPassword) {
      console.log("passwords do not match");
      return;
    }

    if (!username || !email || !password || !confirmPassword) {
      console.log("please fill all fields");
      return;
    }

    try {
      await axiosCongig
        .post("/users", {
          email: email,
          password: password,
          name: "customer",
          surname: "customer",
          username: username,
        })

        .then((res) => {
          console.log("res", res.data);
          dispatch(setUser(res.data));
          navigation.navigate("LoginPage");
        });
    } catch (error) {
      console.log("error register", error.response.data);
    }
  }

  function goLogin() {
    navigation.navigate("LoginPage");
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
        Register
      </Text>
      <TextInput
        placeholder="Username"
        mode="outlined"
        onChangeText={(text) => setUsername(text)}
        value={username}
        style={{
          width: "80%",
        }}
      />

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

      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        mode="outlined"
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        style={{
          width: "80%",
        }}
      />

      <Text
        style={{
          color: "red",
          fontWeight: "bold",
          fontSize: 16,
          display: password === confirmPassword ? "none" : "flex",
        }}
      >
        Passwords do not match.
      </Text>
      <Text
        style={{
          color: "red",
          fontWeight: "bold",
          fontSize: 16,
          display:
            username && email && password && confirmPassword ? "none" : "flex",
        }}
      >
        Please fill all fields.
      </Text>

      <Button title="Register" onPress={handleRegister} />
      <Pressable onPress={goLogin}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            textDecorationLine: "underline",
          }}
        >
          Already have an account? Go to login page.
        </Text>
      </Pressable>
    </View>
  );
}
