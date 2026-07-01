import mongoose from "mongoose"
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierror.js";
import { ApiResponse } from "../utils/apiresponse.js";
import { tweet as Tweet } from "../models/tweet.model.js";

const createtweet= asyncHandler(async(req,res)=>{
    const {content}= req.body;

    if(!content?.trim()){
        throw new ApiError(400,"content is required")
    }

    const tweet =await Tweet.create({
        content,
        owner:req.user._id,
    })

    return res.status(201).json(
        new ApiResponse(201,tweet,"tweet created successfully")
    )
})
const getalltweets= asyncHandler(async(req,res)=>{
    const tweets= await Tweet.find()
    .populate("owner","username fullname avatar")

    return res.status(200).json(
        new ApiResponse(200,tweets)
    )
})

export{getalltweets,createtweet}