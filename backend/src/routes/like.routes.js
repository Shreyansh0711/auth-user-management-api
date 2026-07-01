import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import{togglevideolike,toggletweetlike} from"../controllers/like.controller.js"

const router=Router();

router.route("/toggle/v/:videoid").post(verifyJWT,togglevideolike);
router.post("/toggle/t/:tweetid", verifyJWT, toggletweetlike);
export default router;