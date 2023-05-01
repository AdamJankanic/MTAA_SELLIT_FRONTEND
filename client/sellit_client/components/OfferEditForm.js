import * as React from "react";

import { View, Text, Image, ScrollView, Pressable, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";

import DropDown from "react-native-paper-dropdown";

import axiosConfig from "../axiosConfig";

import { useNavigation } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import { setActiveScreen } from "../reducers/ComponentsReducer";

const categories = [
  { label: "Clothes", value: "500d27a0-f09c-4964-bc3e-3f85392d6ecc" },
  // { label: "Electro", value: "61218e58-8c7a-4973-bda7-c7cc50dfdffc" },
];

const cities = [
  {
    label: "Bratislava",
    value: "14baa92e-0950-4c58-b59d-acf3a5507dda",
  },
];

export function OfferEditForm() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const offerEditDetail = useSelector(
    (state) => state.offerStore.activeEditOfferDetail
  );

  console.log("ediiiiiit", offerEditDetail);

  const [title, setTitle] = React.useState(offerEditDetail.title);

  const [price, setPrice] = React.useState(String(offerEditDetail.price));
  const [description, setDescription] = React.useState(
    offerEditDetail.description
  );

  const [category, setCategory] = React.useState(offerEditDetail.category_id);
  const [categoryVisible, setCategoryVisible] = React.useState(false);

  const [city, setCity] = React.useState(offerEditDetail.city_id);
  const [cityVisible, setCityVisible] = React.useState(false);

  async function handleUpdate() {
    if (!title || !description || !price || !city || !category) {
      Alert.alert("Please fill all fields");
      return;
    }

    console.log("update offer", title, description, price, city, category);

    try {
      const response = await axiosConfig.put(`/offers/${offerEditDetail.id}`, {
        title: title,
        description: description,
        price: Number(price),
        city_id: city,
        category_id: category,
        // images: [{ image: imageBase64 }],
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    dispatch(setActiveScreen("ProfilePage"));
    navigation.navigate("ProfilePage");
  }

  return (
    <View>
      <ScrollView
        style={{
          margin: 5,
          marginTop: 20,
        }}
      >
        <TextInput
          label="Title"
          mode="outlined"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <DropDown
          label={"City"}
          mode={"outlined"}
          value={city}
          setValue={setCity}
          list={cities}
          visible={cityVisible}
          showDropDown={() => setCityVisible(true)}
          onDismiss={() => setCityVisible(false)}
        />

        <TextInput
          label="Price"
          // inputMode="numeric"
          pattern="[0-9]*"
          keyboardType={"numeric"}
          mode="outlined"
          value={price}
          onChangeText={(price) => setPrice(price)}
        />
        <DropDown
          label={"Category"}
          mode={"outlined"}
          value={category}
          setValue={setCategory}
          list={categories}
          visible={categoryVisible}
          showDropDown={() => setCategoryVisible(true)}
          onDismiss={() => setCategoryVisible(false)}
        />

        <TextInput
          label="Description"
          mode="outlined"
          value={description}
          onChangeText={(description) => setDescription(description)}
          multiline={true}
        />

        <Pressable
          style={{
            backgroundColor: "black",
            padding: 10,
            margin: 10,
            borderRadius: 10,
          }}
          onPress={handleUpdate}
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
      </ScrollView>
    </View>
  );
}
