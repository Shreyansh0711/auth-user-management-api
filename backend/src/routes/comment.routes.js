import { Router } from "express";
import {addcomment,getvideocomments} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.route("/videos/:videoid/comments")
    .get(getvideocomments)
    .post(verifyJWT, addcomment);

export default router;