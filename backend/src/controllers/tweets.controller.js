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
const updatetweets=asyncHandler(async(req,res)=>{
    const{tweetid}=req.params
    const{content}=req.body

    if(!mongoose.Types.ObjectId.isValid(tweetid)){
        throw new ApiError(400,"inavlid tweetid");
    }

    if(!content?.trim()){
        throw new ApiError(400,"content is required")
    }

    const foundtweet=await Tweet.findById(tweetid)
    if(!foundtweet){
        throw new ApiError(404,"tweet not found")
    }
    if(foundtweet.owner.toString()!==req.user._id.toString()){
        throw new ApiError(403,"you are not authorized")
    }

    foundtweet.content=content;

    await foundtweet.save();

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            foundtweet,
            "tweet updated successfully"
        )
    )
})

const deletetweets=asyncHandler(async(req,res)=>{
    const{tweetid}=req.params
    if(!mongoose.Types.ObjectId.isValid(tweetid)){
        throw new ApiError(400,"inavlid tweetid");
    }

    const foundtweet=await Tweet.findById(tweetid)
    if(!foundtweet){
        throw new ApiError(404,"tweet not found")
    }
    if(foundtweet.owner.toString()!==req.user._id.toString()){
        throw new ApiError(403,"you are not authorized")
    }
    await foundtweet.deleteOne()

    return res.status(200)
    .json(
        new ApiResponse(200,{},"tweet deleted successfully")
    )
})
export{getalltweets,createtweet,updatetweets,deletetweets}