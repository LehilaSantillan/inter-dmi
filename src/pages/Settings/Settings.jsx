import { Storage, Auth } from "aws-amplify";
import React, { useContext, useState, useEffect  } from "react";
import { Image, Text, View, Platform } from "react-native";
import ButtonComponent from "../../components/Button/Button.component";

import * as Clipboard from "expo-clipboard";
import Constants from "expo-constants";

import { GlobalContext } from "../../context/global/global.context";
import { styles } from "./Settings.style";

import * as ImagePicker from 'expo-image-picker';


export default function SettingsScreen({ onPress }) {
  const { usuario, logout } = useContext(GlobalContext);
  const [image, setImage] = useState(null);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const cameraRollStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (
          cameraRollStatus.status !== "granted" ||
          cameraStatus.status !== "granted"
        ) {
          alert("Sorry, we need these permissions to make this work!");
        }
      }
    })();
  }, []);

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: "Images",
      aspect: [4, 3],
    });

    this.handleImagePicked(result);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      aspect: [4, 3],
      quality: 1,
    });

    this.handleImagePicked(result);
  };

  handleImagePicked = async (pickerResult) => {
    try {
      if (pickerResult.cancelled) {
        alert("Upload cancelled");
        return;
      } else {
        setPercentage(0);
        const img = await fetchImageFromUri(pickerResult.uri);
        const uploadUrl = await uploadImage("demo.jpg", img);
        downloadImage(uploadUrl);
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed");
    }
  };

  uploadImage = (filename, img) => {
    Auth.currentCredentials();
    return Storage.put(filename, img, {
      level: "public",
      contentType: "image/jpeg",
      progressCallback(progress) {
        setLoading(progress);
      },
    })
      .then((response) => {
        return response.key;
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });
  };

  const setLoading = (progress) => {
    const calculated = parseInt((progress.loaded / progress.total) * 100);
    updatePercentage(calculated); // due to s3 put function scoped
  };

  const updatePercentage = (number) => {
    setPercentage(number);
  };

  downloadImage = (uri) => {
    Storage.get(uri)
      .then((result) => setImage(result))
      .catch((err) => console.log(err));
  };

  const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const copyToClipboard = () => {
    Clipboard.setString(image);
    alert("Copied image URL to clipboard");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola! {usuario}</Text>
      {percentage !== 0 && <Text style={styles.percentage}>{percentage}%</Text>}

      {image && (
        <View>
          <Text style={styles.result} onPress={copyToClipboard}>
            <Image
              source={{ uri: image }}
              style={{ width: 250, height: 250 }}
            />
          </Text>
          <Text style={styles.info}>Long press to copy the image url</Text>
        </View>
      )}

      <ButtonComponent onPress={pickImage} title="Agregar desde Galeria" />
      <ButtonComponent onPress={takePhoto} title="Tomar Foto" />
      <ButtonComponent onPress={logout} title="LogOut" color="#900C3F " />
    </View>
  );
}