import * as React from "react";

import { View, Text, Image, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";

import DropDown from "react-native-paper-dropdown";

import { ChooseImage } from "./ImagePicker";

export function AddPage() {
  const [title, setTitle] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [category, setCategory] = React.useState(null);
  const [categoryVisible, setCategoryVisible] = React.useState(false);

  const categories = [
    { label: "Electronics", value: "electronics" },
    { label: "Fashion", value: "fashion" },
    { label: "Home", value: "home" },
    { label: "Books", value: "books" },
    { label: "Sports", value: "sports" },
    { label: "Other", value: "other" },
  ];

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

        <ChooseImage />

        <TextInput
          label="Title"
          mode="outlined"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          label="Location"
          mode="outlined"
          value={location}
          onChangeText={(location) => setLocation(location)}
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
      </ScrollView>
    </View>
  );
}
