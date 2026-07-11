import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierror.js";
import { ApiResponse } from "../utils/apiresponse.js";
import {comment} from "../models/comment.model.js";
import { user } from "../models/user.model.js";

const addcomment=asyncHandler(async(req,res)=>{
    const {content}=req.body
    const {videoid}=req.params
    if (!content?.trim()) {
    throw new ApiError(400, "Comment content is required");}
    const newcomment=await comment.create({
        content,
        video:videoid,
        owner:req.user._id
    })
    const comments=await comment
    .find({video:videoid})
    .populate("owner","username avatar")

    res.status(201)
    .json(new ApiResponse(200, newcomment, "new comment added"))
})

const getvideocomments=asyncHandler(async(req,res)=>{
    const {videoid}=req.params

    const comments=await comment.find({ video: videoid })
        .populate("owner","username fullname avatar")
        .sort({ createdAt: -1 })

    return res.status(200).json(
        new ApiResponse(200, comments, "comments fetched successfully")
    )
})

export { addcomment, getvideocomments };