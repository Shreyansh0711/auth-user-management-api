import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createplaylist,addvideotoplaylist } from "../controllers/playlist.controller.js";

const router = Router();

router.post(
    "/playlists",
    verifyJWT,
    createplaylist
);
router.route("/playlists/:playlistid/videos/:videoid")
    .patch(verifyJWT, addvideotoplaylist);

export default router;