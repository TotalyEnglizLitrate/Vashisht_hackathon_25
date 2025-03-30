import { View, Text, SafeAreaView } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-xl font-bold">Home Screen</Text>
      </View>
    </SafeAreaView>
  );
}