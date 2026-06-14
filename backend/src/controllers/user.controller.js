import {asyncHandler} from "../utils/asynchandler.js"
import {ApiError} from "../utils/apierror.js"
import { user } from "../models/user.model.js"
import{ uploadoncloudinary } from "../utils/cloudinary.js"
import{ApiResponse}from"../utils/apiresponse.js"
const registeruser=asyncHandler(async(req,res)=>{
     const {fullname,email,username,password}=req.body;
    // checking if all fields are filled 
    if([fullname,email,username,password].some((field)=>
    field?.trim()==="")){
        throw new ApiError(400,"All fields are required");
    }
    
    //checking for existed user

    const existeduser=await user.findOne({
        $or:[{email},{username}]
    })

    if(existeduser){
        throw new ApiError(409,"user with email or username is already existed")
    }
    //checking avatar file and verfying from cloudinary 
    const avatarlocalpath=req.files?.avatar[0]?.path
    const coverimagelocalpath=req.files?.coverimage[0]?.path

    if(!avatarlocalpath){
        throw new ApiError(400,"avatar is required")
    }
    //upload avatar and cover on cloudinary
    const avatar=await uploadoncloudinary(avatarlocalpath);
    const coverimage=await uploadoncloudinary(coverimagelocalpath)

    if(!avatarlocalpath){
        throw new ApiError(400,"avatar is required")
    }
    //making object and entrying in DB
   const user=await user.create({
        fullname,
        avatar:avatar.url,
        coverimage:coverimage?.url||"",
        email,
        password,
        username:username.toLowerCase()
    })
    //checking if object is created by usinf findbyid then removing not required fields
    const createduser=await user.findbyid(user._id).select(
        "-password -refreshtoken"
    )
    //checking for user
    if(!createduser){
        throw new ApiError(500,"something went wrong")
    }

    
    //handling responses through api res
    return res.status(201).json(
        new ApiResponse(200,createduser,"user created successfully")
    )
})

export {registeruser}