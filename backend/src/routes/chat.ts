import { Router, type Request, type Response } from "express";
import { protectRoute } from "../middleware/auth";
import { prisma } from "../db";

const router = Router()
router.use(protectRoute)

router.get("/",async (req:Request, res : Response)=>{
    
    try{
        const uesrId = req.userId
        const chats = await prisma.chat.findMany({
            where:{
                participiats : {
                    some : {
                        id : uesrId,
                    },
                }
            },
            include : {
                participiats : {
                    select : {
                        avatar : true,
                        name : true,
                        email : true,
                        id : true,
                        
                    }
                },
                lastMessage : true,
            },
            orderBy : {
                lastMessageAt : "desc"
            }
        })

        const formattedChats = chats.map((c)=>{
            // remove myself from the chats becuase we don't need to ourself in all chats we will see ourself on the profile not the chats
            const otherPeople = c.participiats.find((p)=> p.id.toString() !== uesrId);
            return {
                id : c.id,
                participant : otherPeople,
                lastMessage : c.lastMessage,
                lastMessageAt : c.lastMessageAt,
                createdAt : new Date() // add createdAt row in chat schema
            }
        })
        res.json(formattedChats)
    }catch(e){
        res.status(500).json({
            msg : "unable to fetch all the chats"
        })
    }

})

router.get("/with/:participantId",async (req:Request, res : Response)=>{
    try{
        const userId = req.userId
        const participantId =Array.isArray(req.params.participantId) ? req.params.participantId[0] : req.params.participantId;
        let chat = await prisma.chat.findFirst({
            where : {
                participiats : {
                    every : {
                        id : {in : [userId!, participantId]}
                    }
                }
            },
            select : {
                participiats : {
                    select : {
                        name : true,
                        email : true,
                        avatar : true,
                        id : true,
                        createdAt : true
                    }
                },
                lastMessage : true,
                id : true,
                lastMessageAt : true,
            }
        })

        if(!chat){
            // you might need to fix this 
            const newChat = await prisma.chat.create({
                data : {
                    participiats : {
                        connect : [
                            {id : userId},
                            {id : participantId}
                        ]
                    }
                },
                select : {
                    id : true,
                    participiats : {
                        select : {
                            id : true,
                            name : true,
                            avatar : true
                        }
                    }
                }
            })
        }
        const otherParticipant = chat?.participiats.find((p)=>p.id.toString() !== userId)
        res.json({
            id : chat?.id,
            participant : otherParticipant ?? null,
            lastMessage : chat?.lastMessage,
            lastMessageAt : chat?.lastMessageAt,
            createdAt : chat?.participiats.find((u)=>u.id == userId ) // fix this 
        })
    } catch(e){
        res.status(500).json({
            msg : "unable to find participant"
        })
    }
})

export const chatRouter = router