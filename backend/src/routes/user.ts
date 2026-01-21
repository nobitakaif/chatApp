import { Router, type Request, type Response } from "express";
import { protectRoute } from "../middleware/auth";
import { prisma } from "../db";

const router = Router()

router.post('/signin',protectRoute, async (req:Request,res:Response)=>{
    try{
        const userId = req.userId
        const users = await prisma.user.findFirst({
            where :{
                id :{
                    not : userId,
                },
            },
            select :{
                email : true,
                name : true,
                avatar : true
            },
            take : 50
        })  
        res.status(200).json({
            users
        })
    }catch(e){
        res.status(500).json({
            msg : "unable to get all the user"
        })
    }
})

export const userRoutes = router