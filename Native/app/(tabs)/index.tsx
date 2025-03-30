import { Link } from "expo-router";
import { View } from "react-native";
import { Button, Text, List } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
      <SafeAreaView className="mx-5">

        <Text variant="headlineSmall">Welcome back</Text>
        <Text variant="headlineLarge">User!</Text>

        <Button className="mx-20 mt-20 p-4" mode="elevated" onPress={() => console.log('Pressed')}>
          <Text className="ml-5" variant="headlineLarge">Give Order</Text>
        </Button>
      
        <Text className="mt-5" variant="titleLarge">Previous Orders</Text>
        <View className="border border-slate-300 rounded-lg">

        <List.Item
          title="Random Latpop"
          description="Estimation Received"
          left={props => <List.Icon {...props} icon="clipboard-check-outline" />}
          right={props => <Text variant="headlineSmall">$450</Text>}
        />
        <List.Item
          title="Random Latpop"
          description="Estimation Pending"
          left={props => <List.Icon {...props} icon="clipboard-text-clock-outline" />}
          right={props => <Text variant="headlineSmall">-</Text>}
        />
        <Text className="mx-5 mb-5" variant="labelMedium">See more</Text>

        </View>


        
    </SafeAreaView>
  );
}