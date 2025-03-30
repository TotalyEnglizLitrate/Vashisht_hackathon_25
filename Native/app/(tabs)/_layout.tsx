// import { Tabs } from "expo-router";
// import { ImageBackground, Image, Text, View } from "react-native";

// import { icons } from "@/constants/icons";
// import { images } from "@/constants/images";


// function TabIcon({ focused, icon, title }: any) {
//   if (focused) {
//     return (
//       <ImageBackground
//         source={images.highlight}
//         className="flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden"
//       >
//         <Image source={icon} tintColor="#151312" className="size-5" />
//         <Text className="text-secondary text-base font-semibold ml-2">
//           {title}
//         </Text>
//       </ImageBackground>
//     );
//   }

//   return (
//     <View className="size-full justify-center items-center mt-4 rounded-full">
//       <Image source={icon} tintColor="#A8B5DB" className="size-5" />
//     </View>
//   );
// }

// export default function TabsLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarShowLabel: false,
//         tabBarItemStyle: {
//           width: "100%",
//           height: "100%",
//           justifyContent: "center",
//           alignItems: "center",
//         },
//         tabBarStyle: {
//           backgroundColor: "#0F0D23",
//           borderRadius: 50,
//           marginHorizontal: 20,
//           marginBottom: 36,
//           height: 52,
//           position: "absolute",
//           overflow: "hidden",
//           borderWidth: 1,
//           borderColor: "#0F0D23",
//         },
//       }}
//     >
//       {/* Home Screen */}
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <TabIcon focused={focused} icon={icons.home} title="Home" />
//           ),
//         }}
//       />

//       {/* Items Screen */}
//       <Tabs.Screen
//     name="items"
//   options={{
//     title: "Items",
//     headerShown: false,
//     tabBarIcon: ({ focused }) => (
//       <Text className={focused ? "text-white font-bold" : "text-gray-400"}>
//         Items
//       </Text>
//     ),
//   }}
// />

//       {/* User/ Profile Screen */}
//       <Tabs.Screen
//   name="profile"
//   options={{
//     title: "Profile",
//     headerShown: false,
//     tabBarIcon: ({ focused }) => (
//       <Text className={focused ? "text-white font-bold" : "text-gray-400"}>
//         Profile
//       </Text>
//     ),
//   }}
// />
//     </Tabs>
//   );
// }
import { Tabs } from "expo-router";
import { ImageBackground, Image, Text, View } from "react-native";

import { Icon, MD3Colors } from "react-native-paper";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

function TabIcon({ focused, icon, title }:any) {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden"
        
      >
        {/* <Image source={icon} tintColor="#151312" className="size-5" /> */}
        <Icon source={icon} size={25}></Icon>
        <Text className="text-secondary text-base font-semibold ml-2">
          {title}
        </Text>
      </ImageBackground>
    );
  }

  return (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      {/* <Image source={icon} tintColor="#A8B5DB" className="size-5" /> */}
      <Icon source={icon} size={25} color="#A8B5DB"></Icon>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0F0D23",
          width:"100%",
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0F0D23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={"home-outline"} title="Home" />
          ),
        }}
      />

      <Tabs.Screen
        name="items"
        options={{
          title: "Items",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={"menu"} title="Items" />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={"account-outline"} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}

