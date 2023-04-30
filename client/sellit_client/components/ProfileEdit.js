import * as React from "react";

import { Text, View, Button, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "react-native-paper";

import { setActiveScreen } from "../reducers/ComponentsReducer";
import { setUser } from "../reducers/ComponentsReducer";

import axiosConfig from "../axiosConfig";

export function ProfileEdit() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const user = useSelector((state) => state.componentsStore.user);

  const [username, setUsername] = React.useState(user.username);

  async function saveProfile() {
    console.log("saveProfile");
    console.log("username", username);

    try {
      const res = await axiosConfig
        .put(`/users/${user.id}`, {
          username: username,
          name: "customer",
          surname: "customer",
          email: user.email,
        })
        .then((res) => {
          console.log("res save profile", res.data.response);
          dispatch(setUser(res.data.response));
          dispatch(setActiveScreen("ProfilePage"));
          navigation.navigate("ProfilePage");
        });
    } catch (error) {
      console.log("error save profile", error);
    }
  }

  return (
    <View
      style={{
        width: "80%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <TextInput
        label="Username"
        mode="outlined"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={{
          width: "100%",
          height: 50,
        }}
      />

      <Pressable
        style={{
          backgroundColor: "black",
          padding: 10,
          margin: 10,
          borderRadius: 10,
          width: "35%",
        }}
        onPress={saveProfile}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Save
        </Text>
      </Pressable>
    </View>
  );
}
