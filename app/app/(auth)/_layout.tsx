import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import { Text, View } from "react-native"
import "../../global.css"

export default function AuthLayout (){
    const { isSignedIn,isLoaded } = useAuth()
    if(!isLoaded)return null
    if(isSignedIn) return <Redirect href={"/(tabs)"}/>
    return (
       <Stack screenOptions={{headerShown : false}}  />
    )
}