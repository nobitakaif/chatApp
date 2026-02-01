import { Stack } from "expo-router";
import "../global.css"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ClerkProvider } from "@clerk/clerk-expo"
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Text, View } from "react-native";

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{headerShown : false}} >
          {/* <Stack.Screen  name="(auth)" />
          <Stack.Screen  name="(tabs)"/> */}
            <View className="h-screen bg-red-500 w-full">
              <Text>
                Alright
              </Text>
            </View>
          </Stack>
         
      </QueryClientProvider>
    </ClerkProvider>
  )
}
