import { Router, type Request, type Response } from "express";
import { protectRoute } from "../middleware/auth";
import { prisma } from "../db";

const router = Router()
router.use(protectRoute)

router.get("/",(req:Request, res : Response)=>{

})

router.get("/with/:participantId",(req:Request, res : Response)=>{
    
})

export const chatRouter = router