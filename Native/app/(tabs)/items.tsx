import { View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Button, List } from 'react-native-paper';

interface Order {
  order_id: string;
  order_status: string;
  user_token: string;
  estimated_price: number;
  product_age: number;
  functional: boolean;
  description: string;
  lat: number;
  long: number;
  ewaste_type: string;
  company_token: string;
}

export default function ItemsScreen() {

  // Pure Coopy paste method to the data on to the array.
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.17.79.148:8000/app/orders_info/?user_token=string');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const items: Order[] = data.orders;


  return (
    <SafeAreaView className="mx-2" style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 10 }}>

        <Text variant="headlineLarge">Your orders</Text>
        
        <Text variant="bodyMedium">
          Data: {JSON.stringify(data)}
          {/* Data: {items[0].order_id} */}
        </Text>

        <View className="border border-slate-300 rounded-lg">
          {items.map(item => (
            // <li key={item.order_id}>{item.order_status}</li>
            <List.Item
            title={item.description}
            description={item.order_status}
            // left={props => <List.Icon {...props} icon="clipboard-check-outline" />}
            left={props => <List.Icon {...props} icon={item.order_status === 'estimation received'
              ? 'clipboard-check-outline'
              : 'clipboard-text-clock-outline'
            } />}
            right={props => <Text variant="headlineSmall">{item.order_status === 'estimation received'
              ? item.estimated_price
              : "-"
            }</Text>}
          />
          ))}

          {/* Dummy Stuff */}
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
