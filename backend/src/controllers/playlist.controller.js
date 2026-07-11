import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierror.js";
import { playlist as Playlist } from "../models/playlist.model.js";
import { ApiResponse } from "../utils/apiresponse.js";

const createplaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body
    if (!name) {
        throw new ApiError(400, "playlist name is required")
    }
    const playlist = await Playlist.create({
        name,
        description,
        owner: req.user._id,
        videos: []
    })

    return res
        .status(201)
        .json(
            new ApiResponse(201, playlist, "playlist created successfully")
        )

})
const addvideotoplaylist = asyncHandler(async (req, res) => {
    const { playlistid, videoid } = req.params

    const playlist = await Playlist.findById(playlistid)
    if (!playlist) {
        throw new ApiError(404, "playlist not found")
    }

    if (playlist.videos.includes(videoid)) {
        throw new ApiError(400, "video is already in playlist")
    }

    playlist.videos.push(videoid)
    await playlist.save()

    return res.status(200)
        .json(new ApiResponse(200, playlist, "video added to playlist"))
})
const userplaylist = asyncHandler(async (req, res) => {
    const { userid } = req.params

    if (!userid) {
        throw new ApiError(400, "user id is required")
    }

    const playlists = await Playlist.find({
        owner: userid
    })
    return res
        .status(200)
        .json(new ApiResponse(200, playlists, "user playlists fetched successfully"))
})
export { createplaylist, addvideotoplaylist, userplaylist }