import mongoose from "mongoose"
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierror.js";
import { ApiResponse } from "../utils/apiresponse.js";
import {like} from "../models/like.model.js";
import { video as Video } from "../models/video.model.js";

import{tweet as Tweet} from "../models/tweet.model.js"
const togglevideolike=asyncHandler(async(req,res)=>{
    const{videoid}=req.params;
    if (!mongoose.Types.ObjectId.isValid(videoid)) {
        throw new ApiError(400, "Invalid video id");
    }
    const video=await Video.findById(videoid);
    if(!video){
        throw new ApiError(404,"video not found")
    }
    const alreadyliked=await like.findOne({
        video:videoid,
        likedby:req.user._id,
    })

    if(alreadyliked){
        await like.findByIdAndDelete(alreadyliked._id);

        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "video unliked successfully"
            )
        )
    }
    const likedvideo=await like.create({
        video:videoid,
        likedby:req.user._id,
    })

    return res.status(200).json(
        new ApiResponse(
            201,
            likedvideo,
            "video liked successfully"
        )
    )
})
const toggletweetlike=asyncHandler(async(req,res)=>{
    const{tweetid}=req.params;
    if (!mongoose.Types.ObjectId.isValid(tweetid)) {
        throw new ApiError(400, "Invalid tweet id");
    }
    const foundtweet=await Tweet.findById(tweetid);
    if(!foundtweet){
        throw new ApiError(404,"tweet not found")
    }
    const alreadyliked=await like.findOne({
        tweet:tweetid,
        likedby:req.user._id,
    })

    if(alreadyliked){
        await like.findByIdAndDelete(alreadyliked._id);

        return res.status(201).json(
            new ApiResponse(
                201,
                {},
                "tweet unliked successfully"
            )
        )
    }
    const likedtweet=await like.create({
        tweet:tweetid,
        likedby:req.user._id,
    })

    return res.status(200).json(
        new ApiResponse(
            201,
            likedtweet,
            "tweet liked successfully"
        )
    )
})
export{togglevideolike,toggletweetlike}