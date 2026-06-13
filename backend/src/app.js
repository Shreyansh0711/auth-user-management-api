import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
const app=express()

app.use(cors({
    process:process.env.CORSE_ORIGIN,
    credentials:true
}))
app.use(express.urlencoded({extended:true,limit:"16kb"})
)
app.use(express.static("public")) 
app.use(cookieparser())
app.use(express.json({limit:"16kb"}))
//import routes
import userrouter from "./routes/user.routes.js"
// routes declearation
app.use("/api/v1/users",userrouter)
export{app}