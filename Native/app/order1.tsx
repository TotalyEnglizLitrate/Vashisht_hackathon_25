import { View, Image, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";

export default function OrderScreen() {
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

    const router = useRouter();

  return (
    <SafeAreaView className="mx-5" style={{ flex: 1 }}>

    <Text variant="headlineLarge">Upload Image of Item</Text>

    <View style={styles.container}>
        <Button onPress={pickImage}>Pick an image from camera roll</Button>
        {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>

    <Button mode="contained-tonal" className="mb-10" onPress={() => router.navigate('/order2')}>Continue</Button>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 400,
      height: 400,
    },
  });