import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Button, List } from 'react-native-paper';

interface Item {
  id: number;
  name: string;
}

export default function ProfileScreen() {

  

  return (
    <SafeAreaView className="mx-2" style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 10 }}>

        <Text variant="headlineLarge">Your orders</Text>
        
        <View className="border border-slate-300 rounded-lg">
          <List.Item
            title="Random Latpop"
            description="Estimation Received"
            left={props => <List.Icon {...props} icon="clipboard-check-outline" />}
            right={props => <Text variant="headlineSmall">$450</Text>}
          />
          <List.Item
            title="Junk Hardrive"
            description="Estimation Pending"
            left={props => <List.Icon {...props} icon="clipboard-text-clock-outline" />}
            right={props => <Text variant="headlineSmall">-</Text>}
          />
        </View>

      </View>
    </SafeAreaView>
  );
}
