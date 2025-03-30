import { Link } from "expo-router";
import { View } from "react-native";
import { Button, Text, List } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";

import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';

export default function Index() {

  // Leaflet stuff
  // https://leafletjs.com/examples/quick-start/
  const wvmap = `
<html>
    <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossorigin=""/>
        <!-- Make sure you put this AFTER Leaflet's CSS -->
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossorigin=""></script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
        <div id="map"></div>
    </body>
    <style>
        #map { height: 300px; }
    </style>
    <script>
        var map = L.map('map').setView([51.505, -0.09], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        var marker = L.marker([51.5, -0.09]).addTo(map);
    </script>
</html>
  `


  return (
      <SafeAreaView className="mx-5" style={{ flex:1 }}>

        <Text variant="headlineSmall">Welcome back</Text>
        <Text variant="headlineLarge">User!</Text>

        <Button className="mx-20 mt-5 p-4" mode="elevated" onPress={() => console.log('Pressed')}>
          <Text className="ml-5" variant="headlineLarge">Give Order</Text>
        </Button>
      
        <Text className="mt-5 mb-1" variant="titleLarge">Previous Orders</Text>
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
          <Text className="mx-5 mb-5" variant="labelMedium">See more</Text>
        </View>

        <Text className="mt-5 mb-1" variant="titleLarge">Nearby Collection Centers</Text>

        {/* https://stackoverflow.com/questions/61673447/how-to-give-corner-radius-in-webview-in-react-native */}
        {/* For some mysterious reason, the bottom doesnt roundify. */}
        <View style={{overflow: "hidden", borderRadius: 12, flex: 1}}>
          <WebView
            // style={styles.container}
            // source={{ uri: 'https://expo.dev' }}
            style={{marginBottom: '20%'}}
            source={{ html: wvmap }}
          /> 
        </View>

    </SafeAreaView>
  );
}