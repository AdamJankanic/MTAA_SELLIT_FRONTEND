// sources: https://stackoverflow.com/questions/65931243/how-to-grant-camera-permission-in-react-native-expo-app-android
// code in comments with example of how to use expo camera
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image, Pressable } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

import { useDispatch, useSelector } from "react-redux";
import { setImage } from "../reducers/ComponentsReducer";

export function UploadImage({ navigation }) {
  const dispatch = useDispatch();

  const uriToBase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException("Error converting image to base64"));
      };
      reader.readAsDataURL(blob);
    });
  };

  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);

  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const permisionFunction = async () => {
    // here is how you can get the camera permission
    // const cameraPermission = await Camera.requestPermissionsAsync();
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

    setCameraPermission(cameraPermission.status === "granted");

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log(imagePermission.status);

    setGalleryPermission(imagePermission.status === "granted");

    if (
      imagePermission.status !== "granted" &&
      cameraPermission.status !== "granted"
    ) {
      alert("Permission for media access needed.");
    }
  };

  useEffect(() => {
    permisionFunction();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data.uri);
      setImageUri(data.uri);

      try {
        const base64data = await uriToBase64(data.uri);
        // send base64data to server
        console.log("base64data");
        // console.log(base64data);
        dispatch(setImage(base64data));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      const asset = result.assets[0];
      setImageUri(asset.uri);
      console.log("asset");
      console.log(asset.uri);

      try {
        const base64data = await uriToBase64(asset.uri);
        // send base64data to server
        console.log("base64data");
        dispatch(setImage(base64data));
        // console.log(base64data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // console.log("imageUri from redux store");
  // console.log(useSelector((state) => state.componentsStore.image));

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={"1:1"}
        />
      </View>
      {/* <Button title={"Take Picture"} onPress={takePicture} /> */}

      <Pressable
        style={{
          backgroundColor: "black",
          padding: 10,
          margin: 10,
          borderRadius: 10,
        }}
        onPress={takePicture}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Take Picture
        </Text>
      </Pressable>

      {/* <Button title={"Gallery"} onPress={pickImage} /> */}
      <Pressable
        style={{
          backgroundColor: "black",
          padding: 10,
          margin: 10,
          marginTop: 0,
          borderRadius: 10,
        }}
        onPress={pickImage}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Gallery{" "}
        </Text>
      </Pressable>

      {imageUri && (
        <Image
          style={{ height: 300 }}
          source={{ uri: imageUri ? imageUri : "https://picsum.photos/200" }}
          // source={{ uri: props.offer.userImage }}
        />
      )}
      {/* {imageUri && <Image source={{ uri: imageUri }} style={{}} />} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "green",
  },
  fixedRatio: {
    flex: 1,
    // aspectRatio: 1,
    height: 300,
  },
  button: {
    flex: 0.1,
    padding: 10,
    alignSelf: "flex-end",
    alignItems: "center",
  },
});
