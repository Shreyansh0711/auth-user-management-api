import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"

const app = express()

app.use(cors({
    process: process.env.CORSE_ORIGIN,
    credentials: true
}))
app.use(express.urlencoded({ extended: true, limit: "16kb" })
)
app.use(express.static("public"))
app.use(cookieparser())
app.use(express.json({ limit: "16kb" }))
//import routes
import userrouter from "./routes/user.routes.js"
// routes declearation
app.use("/api/v1/users", userrouter)
import videoRouter from "./routes/video.routes.js";
import passport from "./passport.js";
app.use(passport.initialize());
app.use("/api/v1", videoRouter);
import commentRouter from "./routes/comment.routes.js";
app.use("/api/v1", commentRouter);
import playlistrouter from "./routes/playlist.routes.js"
app.use("/api/v1", playlistrouter)
import likeRouter from "./routes/like.routes.js";
app.use("/api/v1", likeRouter);
import tweetRouter from "./routes/tweet.routes.js";
app.use("/api/v1", tweetRouter);
export { app }