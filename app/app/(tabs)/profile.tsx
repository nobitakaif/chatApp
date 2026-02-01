import { useAuth } from "@clerk/clerk-expo"
import { Text, Pressable} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import "../../global.css"

const ProfileTab = ()=>{
    const {signOut} = useAuth()
    return (
        <SafeAreaView className="bg-black h-screen w-full">
            <Text className="text-white">Profile</Text>
            <Pressable onPress={()=>signOut()} className="bg-white w-12 h-20">
                <Text className="text-white w-full  font-bold bg-red-500 rounded-2xl h-20  text-center ">Signout</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default ProfileTab
