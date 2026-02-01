import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import { Text, View } from "react-native"
import "../../global.css"

export default function AuthLayout (){
    const { isSignedIn } = useAuth()
    if(isSignedIn) return <Redirect href={"/(tabs)"}/>
    return (
       <Stack screenOptions={{headerShown : false}}  />
    )
}