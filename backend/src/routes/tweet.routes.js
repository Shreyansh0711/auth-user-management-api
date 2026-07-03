import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createtweet,
    getalltweets,
    updatetweets,
    deletetweets
} from "../controllers/tweets.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/create-tweet")
    .post(createtweet)
router.route("/update/:tweetid")
    .patch(updatetweets)
router.route("/delete/:tweetid")
    .delete(deletetweets)

router.route("/get-tweets")
    .get(getalltweets)
export default router;