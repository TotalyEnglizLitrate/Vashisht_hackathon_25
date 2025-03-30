import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from 'react-native-paper';



export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 10 }}>
        <Text>Items list</Text>
        <Button onPress={() => console.log('Pressed')}>Press me</Button>

      </View>
    </SafeAreaView>
  );
}
