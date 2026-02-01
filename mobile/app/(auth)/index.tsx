import { Image } from "expo-image";
import { Dimensions, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css"


const { width, height } = Dimensions.get("window")
export default function Profile(){
    
    return <View style={{
        flex : 1,
        // backgroundColor : "black",
    }}
        className="bg-red-800"
    >
        <View style={{
            position : "absolute",
            inset : 0,
            overflow : "hidden"
        }}>
            <SafeAreaView style={{
                flex : 1
            }}>
                <View style={{
                    alignItems : "center",
                    paddingTop : 10
                }}>
                    <Image source={require("../../assets/logo.png")}
                        style = {{
                            width : 100,
                            height : 100,
                            marginVertical : -20
                        }}
                        contentFit="contain"
                    />
                </View>
                <Text className="text-white">MyChat</Text>
            </SafeAreaView>
        </View>
    </View>
}