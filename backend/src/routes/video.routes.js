import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { publishvideo,getvideobyid } from "../controllers/video.controller.js";

const router=Router()

router.route("/videos").post(
    verifyJWT,
    upload.fields([
        {
            name:"videofile",
            maxCount:1
        },{
            name:"thumbnail",
            maxCount:1
        }
    ]),
    publishvideo
)
router.route("/videos/:videoid").get(getvideobyid)
export default router