import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createtweet,
    getalltweets,
} from "../controllers/tweets.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/create-tweet")
    .post(createtweet)

router.route("/get-tweets")
    .get(getalltweets)
export default router;