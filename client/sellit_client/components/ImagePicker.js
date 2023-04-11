import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ToastAndroid,
  TouchableHighlight,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Avatar, Button } from "react-native-paper";

export function ChooseImage() {
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const setToastMsg = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const permisionFunction = async () => {
    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log(imagePermission.status);

    setGalleryPermission(imagePermission.status === "granted");

    if (imagePermission.status !== "granted") {
      setToastMsg("Permission for media access needed.");
    }
  };

  useEffect(() => {
    permisionFunction();
  }, []);

  const pick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImageUri(null);
    setToastMsg("Image Removed");
  };

  return (
    <View>
      <View style={styles.innerContainer}>
        <TouchableHighlight onPress={pick} underlayColor="rgba(0,0,0,0)">
          {imageUri === null ? (
            <Avatar.Image
              style={{ backgroundColor: "#e91e63" }}
              size={250}
              source={require("../assets/adaptive-icon.png")}
            />
          ) : (
            <Avatar.Image size={250} source={{ uri: imageUri }} />
          )}
        </TouchableHighlight>
      </View>
      <View
        style={[styles.innerContainer, { marginTop: 25, flexDirection: "row" }]}
      >
        <Button
          mode="contained"
          onPress={pick}
          style={{
            backgroundColor: "#e91e63",
          }}
        >
          Upload Image
        </Button>
        <Button
          mode="contained"
          onPress={() => removeImage()}
          style={{
            marginLeft: 20,
            backgroundColor: "#e91e63",
          }}
        >
          Remove Image
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
});
