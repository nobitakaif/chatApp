import experss from "express"
import { chatRouter } from "./routes/chat.ts"
import { messagesRoutes } from "./routes/messages.ts"
import { userRoutes } from "./routes/user.ts"
import { authRoutes } from "./routes/auth.ts"
import { clerkMiddleware } from "@clerk/express"

const app = experss()
app.use(experss.json())

app.use(clerkMiddleware()) 

app.get("/server-up",async (req,res)=>{
    res.send(`<h1> server is up </h1>`)
})

app.use("/api/auth", authRoutes)
app.use("/api/chat", chatRouter)
app.use("/api/messages", messagesRoutes)
app.use("/api/user", userRoutes)

export default app