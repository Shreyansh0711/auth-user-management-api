import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierror.js";
import { user as User } from "../models/user.model.js";
import { video} from "../models/video.model.js";
import { uploadoncloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiresponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

const publishvideo=asyncHandler(async(req,res)=>{
    const {title,description}=req.body

    if(!title||!description){
        throw new ApiError(400,"title and description is required")
    }

    const videolocalpath=req.files?.videofile?.[0].path;
    const thumbnaillocalpath=req.files?.thumbnail?.[0].path;

    if (!videolocalpath) {
        throw new ApiError(400, "Video file missing");
    }

    if (!thumbnaillocalpath) {
        throw new ApiError(400, "Thumbnail missing");
    }

    const uploadedvideo=await uploadoncloudinary(videolocalpath)
    const uploadedthumbnail=await uploadoncloudinary(thumbnaillocalpath)

    if(!uploadedvideo){
        throw new ApiError(500,"video upload failed")
    }

    //create document
    const createdvideo=await video.create({
        title,
        description,
        videofile:uploadedvideo.secure_url,
        thumbnail:uploadedthumbnail.secure_url,
        duration:uploadedvideo.duration,
        owner:req.user._id
    })

    return res
    .status(201)
    .json(
        new ApiResponse(201,createdvideo,"video uploaded successfully")
    )

})
const getvideobyid=asyncHandler(async(req,res)=>{
    const {videoid}=req.params

    const foundvideo=await video.findById(videoid).populate("owner","username avatar")
    if(!foundvideo){
        throw new ApiError(404,"video not found")
    }
    
    foundvideo.views+=1;
    await foundvideo.save()

    return res.status(200)
    .json(
        new ApiResponse(200,foundvideo,"video fetched successfully")
    )
})

export {publishvideo,getvideobyid}