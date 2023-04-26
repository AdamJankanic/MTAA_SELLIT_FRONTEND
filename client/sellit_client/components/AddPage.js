import * as React from "react";

import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { Button, TextInput } from "react-native-paper";

import DropDown from "react-native-paper-dropdown";

import { ChooseImage } from "./ImagePicker";

import axiosConfig from "../axiosConfig";

import { UploadImage } from "./UploadImage";

import { useDispatch, useSelector } from "react-redux";
import {
  setNewOffer,
  // postNewOffer
} from "../reducers/OfferReducer";

export function AddPage() {
  const dispatch = useDispatch();
  const [title, setTitle] = React.useState("");

  const [price, setPrice] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [category, setCategory] = React.useState(null);
  const [categoryVisible, setCategoryVisible] = React.useState(false);

  const [city, setCity] = React.useState(null);
  const [cityVisible, setCityVisible] = React.useState(false);

  const categories = [
    { label: "Clothes", value: "500d27a0-f09c-4964-bc3e-3f85392d6ecc" },
    // { label: "Electro", value: "61218e58-8c7a-4973-bda7-c7cc50dfdffc" },
  ];

  const cities = [
    {
      label: "Bratislava",
      value: "14baa92e-0950-4c58-b59d-acf3a5507dda",
    },
    // {
    //   label: "Nitra 94901",
    //   value: "01f633e4-b9aa-4c2f-a702-49d35e50fdeb",
    // },
  ];

  const imageBase64 = useSelector((state) => state.componentsStore.image);

  async function handleSubmit() {
    // dispatch(
    //   setNewOffer({
    //     title: title,
    //     description: description,
    //     price: price,
    //     city_id: city,
    //     category_id: category,
    //     images: [{ image: imageBase64 }],
    //     // image: imageBase64,
    //   })
    // );

    try {
      const response = await axiosConfig.post("/offers", {
        title: title,
        description: description,
        price: price,
        city_id: city,
        category_id: category,
        images: [{ image: imageBase64 }],
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);

      // navigation.navigate("Home");
    }
  }

  // console.log(useSelector((state) => state.offerStore.newOffer.images));

  return (
    <View>
      <ScrollView
        style={{
          margin: 5,
          marginTop: 0,
        }}
      >
        {/* <Image
          style={{ width: "100%", height: 300, borderRadius: 2 }}
          source={{ uri: "https://picsum.photos/700" }}
        /> */}

        {/* <ChooseImage /> */}

        <UploadImage />

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
          inputMode="numeric"
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

        <Pressable onPress={handleSubmit}>
          <Text>Add</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
