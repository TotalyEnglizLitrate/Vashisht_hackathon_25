import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { router } from "expo-router";

export default function Profile() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/login");
    } catch (error: any) {
      console.error("Sign Out Error:", error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-xl font-bold mb-4">Profile</Text>
        {user && (
          <Text className="text-white mb-4">{user.email}</Text>
        )}
        <TouchableOpacity 
          onPress={handleSignOut} 
          className="bg-red-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


  