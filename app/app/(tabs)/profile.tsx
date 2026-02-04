import { useAuth } from "@clerk/clerk-expo"
import { Text, Pressable} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import "../../global.css"

const ProfileTab = ()=>{
    const {signOut} = useAuth()
    return (
        <SafeAreaView className="bg-black h-screen w-full">
            <Text className="text-white ">Profile</Text>
            <Pressable onPress={()=>signOut()} className="bg-white rounded-full h-10 text-center flex justify-center items-center">
                <Text className="  font-bold  rounded-2xl  text-center ">Signout</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default ProfileTab
