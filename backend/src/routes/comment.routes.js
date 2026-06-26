import { Router } from "express";
import {addcomment} from "../controllers/comment.controller.js";
import{upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.route(
    "/videos/:videoid/comments").post(
    verifyJWT,
    addcomment
);

export default router;