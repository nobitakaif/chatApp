
import { Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Chats() {
  return (
    <SafeAreaView style={{
      backgroundColor : "black"
    }} className="bg-surface"  >
      <Text className="text-2xl">Chat </Text>
    </SafeAreaView>
  );
}
