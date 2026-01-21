import { Router, type Response, type Request} from "express";
import { protectRoute } from "../middleware/auth";
import { prisma } from "../db";
import { clerkClient, getAuth } from "@clerk/express";

const router = Router()

router.get("/me", protectRoute, async (req:Request,res:Response)=>{
    const userId = req.userId

    try{
        const user = await prisma.user.findFirst({
            where:{
                id : userId
            }
        })
        if(!user){
            res.status(403).json({
                msg : "user is not found "
            })
            return 
        }
        res.status(200).json({
            id : user.id
        })
    }catch(e){
        res.status(500).json({
            error : "Internal server error"
        })
    }
    
})

router.post("/callback", async (req,res)=>{
    try{
        const { userId : clerkId } = getAuth(req)
        if(!clerkId){
            res.status(401).json({
                msg : "Unauthorized"
            })
            return 
        }
        let user = await prisma.user.findFirst({
            where :{
                clerkId : clerkId
            }
        })
        if(!user){
            const clerkUser = await clerkClient.users.getUser(clerkId)
            user = await prisma.user.create({
                data : {
                    clerkId, 
                    name : clerkUser.firstName ? `${clerkUser.firstName} ${clerkUser.lastName || ""}`.trim()  : clerkUser.emailAddresses[0].emailAddress.split('@')[0],
                    email : clerkUser.emailAddresses[0].emailAddress,
                    avatar : clerkUser.imageUrl
                }
            })
        }
        res.json({user})
    }catch(e){
        res.status(500).json({
            msg : "internal server error"
        })
    }
})
export const authRoutes = router