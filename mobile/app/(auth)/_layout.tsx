import { Redirect } from "expo-router";
import { Text, View } from "react-native"

export default function AuthLayout (){
    const isAuth = true;
    if(isAuth) return <Redirect href={"/(tabs)"}/>
    return (
        <View className="flex-1 mt-20">
            <Text>AuthLayout</Text>
        </View>
    )
}