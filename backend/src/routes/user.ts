import { Router } from "express";

const router = Router()

router.post('/signin',(req,res)=>{
    const username = req.body.username
    const password = req.body.password
})

export const userRoutes = router