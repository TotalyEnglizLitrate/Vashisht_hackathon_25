import { View, Image, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";

export default function FormScreen() {
    const [image, setImage] = useState<string | null>(null);


  return (
    <SafeAreaView className="mx-5" style={{ flex: 1 }}>

        <Text variant="headlineLarge">Enter details</Text>

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