import { Router, type Request, type Response } from "express";
import { protectRoute } from "../middleware/auth";
import { prisma } from "../db";

const router = Router()


router.get("/chat/:chatId", protectRoute, async (req:Request,res:Response)=>{
    const { chatId } = req.params
    const userId = req.userId
    if(!userId){
        return 
    }
    try{
        const chat = await prisma.chat.findFirst({
            where:{
                id : chatId as string,
                participiats :{
                    some : {
                        id : userId
                    }
                }
            }
        })
        if(!chat) {
            res.status(404).json({
                msg : "No chat yet"
            })
        }
        const messages = await prisma.message.findMany({
            where :{
                chatId : chatId as string
            },
            select :{
                sender : true,
            },
            orderBy : {
                createdAt : "desc"
            }
        })
        res.json(messages)
    }catch(e){  
        res.status(402).json({
            msg : "something happens wrong"
        })
    }
})


export const messagesRoutes = router