
import { SignedIn, SignedOut,  SignInButton, UserButton} from "@clerk/clerk-react"

export function  User(){
    return <div>
        <SignedOut>
          <SignInButton mode="modal"/>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
    </div>
}