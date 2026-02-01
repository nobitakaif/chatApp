import { Image } from "expo-image";
import { ActivityIndicator, Dimensions, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css"
import { Ionicons } from "@expo/vector-icons";
import useAuthSocial from "hooks/useSocial";


const { width, height } = Dimensions.get("window")
export default function Profile(){
    
    const {hanleSocailAuth, loadingStrategy} = useAuthSocial()
    
    
    return <View className="bg-surface-dark flex-1">
        <View className="absolute inset-0 overflow-hidden">
            <SafeAreaView className="flex-1">
                <View className="items-center pt-10">
                    <Image source={require("../../assets/logo.png")}
                        style = {{
                            width : 100,
                            height : 100,
                            marginVertical : -20
                        }}
                        contentFit="contain"
                    />
                </View>
                <Text className="text-primary text-4xl font-serif tracking-wide uppercase font-bold text-center">MyChat</Text>
                <View className="flex-1 justify-center items-center px-6">
                    <Image source={require("../../assets/auth.png")} style={{
                            width : width - 48,
                            height : height * 0.3
                        }}
                        contentFit="contain"
                    />
                    <View className="mt-6 items-center">
                        <Text className="text-4xl font-bold text-foreground text-center font-serif">
                            Connect & Chat
                        </Text>
                        <Text className="text-3xl font-bold text-primary">
                            Seamlessly
                        </Text>
                    </View>
                    <View className="flex-row gap-4 mt-10">
                        <Pressable className="flex-1 flex-row items-center justify-center gap-2 bg-white/95 py-4 rounded-2xl active:scale-[0.98]"  
                            disabled = {loadingStrategy === "oauth_google"}
                            onPress={()=>{
                                hanleSocailAuth("oauth_google")
                            }}
                        >
                            {
                                loadingStrategy === "oauth_google" ? (
                                    <ActivityIndicator size={"small"} color={"black"}/>
                                ) : (
                                    <>
                                        <Image source={require("../../assets/google.png")} style={{width : 20, height : 20}} contentFit="cover"/>
                                        <Text className="font-bold text-xl">Google</Text>
                                    </>
                                )
                            }
                        </Pressable>
                        <Pressable className="flex-1 flex-row items-center justify-center gap-2 bg-white/95 py-4 rounded-2xl active:scale-[0.98]" 
                            disabled = {loadingStrategy === "oauth_apple"}
                            onPress={()=>{
                                hanleSocailAuth("oauth_apple")
                            }}
                        >
                            {
                                loadingStrategy === "oauth_apple" ? (
                                    <ActivityIndicator size={"small"} color={"black"}/>
                                ) : (
                                    <>
                                        <Ionicons name="logo-apple" size={20} color={"#fffff"}/>
                                        <Text className="font-bold text-xl">Apple</Text>
                                    </>
                                )
                            }
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    </View>
}