import type { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";

import { requireAuth } from "@clerk/express";
import { prisma } from "../db";

export const protectRoute = [
    requireAuth(),
    async(req:Request, res:Response, next:NextFunction)=>{
        try{
            const { userId } = getAuth(req)
            if(!userId){
                return res.status(401).json({
                    message : "You're not Authorized"
                })    
            }
            const user = await prisma.user.findFirst({
                where:{
                    clerkId : userId!
                }
            })
            req.userId = user?.id 
        }catch(e){

        }
    }
]