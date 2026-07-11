import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
import { ApiError } from "./utils/apierror.js"

const app = express()

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173,http://127.0.0.1:5173")
    .split(",")
    .map((origin) => origin.trim());

app.use(cors({
    origin(origin, callback) {
        // Requests from Postman have no Origin header; browser requests must
        // come from the local frontend development server.
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new ApiError(403, `Origin ${origin} is not allowed by CORS`));
    },
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
import subscriptionRouter from "./routes/subscriptions.routes.js";
app.use("/api/v1", subscriptionRouter);

app.use((err, req, res, next) => {
    const statusCode = err instanceof ApiError ? err.statusCode : 500;

    if (!(err instanceof ApiError)) {
        console.error(err);
    }

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal server error",
        errors: err.errors || []
    });
});
export { app }
