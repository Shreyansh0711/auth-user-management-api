import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createplaylist,addvideotoplaylist,userplaylist} from "../controllers/playlist.controller.js";

const router = Router();

router.post(
    "/playlists",
    verifyJWT,
    createplaylist
);
router.route("/playlists/:playlistid/videos/:videoid")
    .patch(verifyJWT, addvideotoplaylist);
router.route("/users/:userid")
    .get(verifyJWT,userplaylist)
export default router;