import { Router } from "express";
import { optionalVerifyJWT, verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { publishvideo, getallvideos, getvideobyid } from "../controllers/video.controller.js";

const router = Router()

router.route("/videos").post(
    verifyJWT,
    upload.fields([
        {
            name: "videofile",
            maxCount: 1
        }, {
            name: "thumbnail",
            maxCount: 1
        }
    ]),
    publishvideo
)
router.route("/videos").get(getallvideos)
router.route("/videos/:videoid").get(optionalVerifyJWT, getvideobyid)
export default router
