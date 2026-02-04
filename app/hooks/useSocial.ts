
import { useSSO } from "@clerk/clerk-expo";
import { useState } from "react";
import { Alert } from "react-native";

export default function useAuthSocial(){
    const [ loadingStrategy, setLoadingStrategy] = useState<string | null>(null)
    const { startSSOFlow } = useSSO()
    const handleSocailAuth  = async (strategy : "oauth_google" | "oauth_apple") =>{
        if(loadingStrategy) return 
        setLoadingStrategy(strategy)
        
        try{
            const { createdSessionId, setActive } = await startSSOFlow({strategy});
            if(createdSessionId && setActive){
                await setActive({session : createdSessionId})
            }
        }catch(e){
            console.log("Error is social auth : ", e)
            const provider = strategy === "oauth_google" ? "Google" : "Apple"
            Alert.alert('Error', `Failed to sign in with ${provider}. Please try again.`)
        }finally{
            setLoadingStrategy(null)
        }
    }
    return {handleSocailAuth, loadingStrategy}
}

