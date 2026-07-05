import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierror.js";
import { user as User } from "../models/user.model.js";
import { uploadoncloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiresponse.js";
import { sendEmail } from "../utils/sendEmail.js";

import jwt from "jsonwebtoken"
import mongoose from "mongoose"
const generateAccessAndRefreshtoken=async(userid)=>{
    try {
        const user=await User.findById(userid)
        const accesstoken=user.generateAccessToken()
        const refreshtoken=user.generateRefreshToken()
        
        user.refreshtoken=refreshtoken

        //saving in database
        await user.save({validateBeforeSave:false})

        return{accesstoken,refreshtoken}



    } catch (error) {
        throw new ApiError(500,"something went wrong while accessing and refreshing token")
    }
}
const registeruser = asyncHandler(async (req, res) => {

    const { fullname, email, username, password } = req.body;

    // validation
    if ([fullname, email, username, password].some(f => !f?.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    // check existing user
    const existeduser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existeduser) {
        throw new ApiError(409, "User already exists");
    }

    // files
    const avatarlocalpath = req.files?.avatar?.[0]?.path;
    const coverimagelocalpath = req.files?.coverimage?.[0]?.path;

    if (!avatarlocalpath) {
        throw new ApiError(400, "Avatar is required");
    }

    // upload avatar
    const avatar = await uploadoncloudinary(avatarlocalpath);

    if (!avatar) {
        throw new ApiError(500, "Avatar upload failed");
    }

    // upload cover (optional)
    let coverimage = null;
    if (coverimagelocalpath) {
        coverimage = await uploadoncloudinary(coverimagelocalpath);
    }

    // create user
    const createdUser = await User.create({
        fullname,
        avatar: avatar.url,
        coverimage: coverimage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    });

    const verificationToken=jwt.sign(
        {
            userid:createdUser._id,
            email:createdUser.email,
        },
        process.env.EMAIL_VERIFICATION_SECRET,
        {
            expiresIn:process.env.EMAIL_VERIFICATION_EXPIRY,
        }
    )
    const verificationUrl =
  `http://localhost:7000/api/v1/users/verify-email?token=${verificationToken}`;
    await sendEmail({
    email: createdUser.email,
    subject: "Verify your Email",
    html: `
        <h2>Welcome ${createdUser.fullname}</h2>
        <p>Click the link below to verify your email.</p>

        <a href="${verificationUrl}">
            Verify Email
        </a>
    `
    });
    // fetch safe user
    const finalUser = await User.findById(createdUser._id).select(
        "-password -refreshtoken"
    );

    if (!finalUser) {
        throw new ApiError(500, "Something went wrong");
    }

    return res.status(201).json(
    new ApiResponse(
            201,
            finalUser,
            "User created successfully. Please verify your email."
        )
    );
});
const verifyEmail =asyncHandler(async(req,res)=>{
    const{token}=req.query

    if(!token){
        throw new ApiError(400,"verification token is required")
    }

    let decodedtoken;

    try{
        decodedtoken=jwt.verify(
            token,
            process.env.EMAIL_VERIFICATION_SECRET
        )
    }catch(error){
        throw new ApiError(401,"invalid or expired token")
    }

    const user=await User.findById(decodedtoken.userid)

    if(!user){
        throw new ApiError(404,"user not found")
    }

    if(user.isEmailVerified){
        return res.status(200)
        .json(
            new ApiResponse(200,{},"Email is already verified")
        )
    }

    user.isEmailVerified=true

    await user.save({
        validateBeforeSave:false
    })

    return res.status(200)
    .json(
        new ApiResponse(200,{},"email verified successfully")
    )
})
const loginuser=asyncHandler(async(req,res)=>{
    const{email,username,password} =req.body
    
    if(!username&&!email){
        throw new ApiError(400,"username or email is required")
    }
    
    const user = await User.findOne({
        $or: [{ username }, { email }]
    }); 

    if (!user.isEmailVerified) {
        throw new ApiError(403, "Please verify your email first");
    }
    if(!user){
        throw new ApiError(404,"user not exists")
    }

    const ispass=await user.isvalidpassword(password)

    if(!ispass){
        throw new ApiError
        (401,"password is incorrect")
    }

   const {accesstoken,refreshtoken} =await generateAccessAndRefreshtoken(user._id)

    const loggedinuser=await User.findById(user._id).select("-password -refreshtoken")

    const options={
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accesstoken",accesstoken)
    .cookie("refreshtoken",refreshtoken)
    .json(
        new ApiResponse(
            200,{
                user:loggedinuser,accesstoken,refreshtoken
            },
                "user loggedin successfully"
        )
    )
})
const logoutuser=asyncHandler(async(req,res)=>{
    User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshtoken:undefined
            },
            new:true
        }
    )
    const options={
        httpOnly:true,
        secure:true
    }
    return res
    .status(200)
    .clearCookie("accesstoken",options)
    .clearCookie("refreshtoken",options)
    .json(new ApiResponse(200,{},"user logged out"))
})
const refreshaccesstoken=asyncHandler(async(req,res)=>{
    const incomingrefreshtoken=req.cookies.refreshtoken||req.body.refreshtoken

    if(!incomingrefreshtoken){
        throw new ApiError(401,"unauthorized request")
    }

    try {
        const decodedtoken=jwt.verify(
            incomingrefreshtoken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user=await User.findById(decodedtoken?._id)
    
        if(!user){
            throw new ApiError(401,"Invalid refresh token")
        }
    
        if(incomingrefreshtoken!==user?.refreshtoken){
            throw new ApiError(401,"refresh token is expired or used")
            
        }
        const options={
            httpOnly:true,
            secure:true
        }
    
    const {accesstoken,refreshtoken: newrefreshtoken} = await generateAccessAndRefreshtoken(user._id);
    
    return res.status(200)
    .cookie("accesstoken", accesstoken, options)
    .cookie("refreshtoken", newrefreshtoken, options)
    .json(
        new ApiResponse(
            200,
            {
                accesstoken,
                refreshtoken: newrefreshtoken
            },
            "access token refreshed"
        )
    );
    } catch (error) {
        throw new ApiError(401,
            error?.message||"invalid refresh token"
        )
    }

})

const changecurrrentpassword=asyncHandler(async(req,res)=>{
    const {oldpassword,newpassword}=req.body

    const user=await User.findById(req.user?._id)
    const ispasswordcorrect=await user.isvalidpassword(oldpassword)

    if(!ispasswordcorrect){
        throw new ApiError(400,"invalid old password")
    }
    user.password=newpassword
    await user.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(new ApiResponse(200,{},"password changed successfully"))
})

const getcurrentuser = asyncHandler(async (req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.user,
        "Current user fetched successfully"
    ));
});

const updateaccountdetails=asyncHandler(async(req,res)=>{
    const{fullname,email}=req.body
    if(!fullname||!email){
        throw new ApiError(400,"all fields are required")
    }
   const user= await User.findByIdAndUpdate(req.user?._id,
    {
        $set:{
            fullname,
            email
        }
    },
    {new:true}
   ).select("-password")

   return res.status(200)
   .json(new ApiResponse(200,user,"account details updated successfully"))
})

const updateuseravatar=asyncHandler(async(req,res)=>{
    const avatarlocalpath=req.file?.path

    if(!avatarlocalpath){
        throw new ApiError(400,"avatar files is missing")
    }

    const avatar=await uploadoncloudinary(avatarlocalpath)

    if(!avatar.url){
        throw new ApiError(400,"error while uploading avatar")
    }

    const user=await User.findByIdAndUpdate(
        req.user?._id,
        {$set:{
            avatar:avatar.url
        }},
        {new : true}
    ).select("-password")
    return res.status(200)
    .json(
        new ApiResponse(200,user,"avatar is updated")
    )
})
const updateusercoverimage=asyncHandler(async(req,res)=>{
    const coverimagelocalpath=req.file?.path

    if(!coverimagelocalpath){
        throw new ApiError(400,"coverimage files is missing")
    }

    const coverimage=await uploadoncloudinary(coverimagelocalpath)

    if(!coverimage.url){
        throw new ApiError(400,"error while uploading coverimage")
    }

    const user=await User.findByIdAndUpdate(
        req.user?._id,
        {$set:{
            coverimage:coverimage.url
        }},
        {new : true}
    ).select("-password")
    return res.status(200)
    .json(
        new ApiResponse(200,user,"coverimage is updated")
    )
})

const getuserchannelprofile=asyncHandler(async(req,res)=>{
    const{username}=req.params
    if(!username?.trim()){
        throw new ApiError(400,"username is missing")
    }

    const channel=await User.aggregate([
        {$match:{
            username:username?.toLowerCase()
        }},{
            $lookup:{
                from:"subscription",
                localField:"_id",
                foreignField:"channel",
                as:"subscriber"
            }
        },{
            $lookup:{
                from:"subscription",
                localField:"_id",
                foreignField:"subscriber",
                as:"subscribedto"
            }
        },{
            $addFields:{
                subscribercount:{
                    $size:"$subscriber"
                },
                channelsubscribertocount:{
                    $size:"$subscribedto"
                },
                issubscribed:{
                    $cond:{
                        if:{
                            $in:[req.user?._id,"$subscriber.subscriber"]
                        },
                        then:true,
                        else:false
                    }
                }
            }
        },{
            $project:{
                fullname:1,
                username:1,
                subscribercount:1,
                channelsubscribertocount:1,
                issubscribed:1,
                avatar:1,
                coverimage:1,
                email:1
            }
        }
    ])
    if(!channel?.length){
        throw new ApiError(404,"channel does not exists")
    }

    return res.status(200)
    .json(
        new ApiResponse(200,channel[0],"user channel fetched successfully")
    )
})

const getwatchhistory=asyncHandler(async(req,res)=>{
    const users=await User.aggregate([{
        $match:{
            _id: new mongoose.Types.ObjectId(req.user._id)
        }
    },{
            $lookup:{
                from:"videos",
                localField:"watchhistory",
                foreignField:"_id",
                as:"watchHistory",
                pipeline:[
                    {
                        $lookup:{
                        from:"users",
                        localField:"owner",
                        foreignField:"_id",
                        as:"owner",
                        pipeline:[{
                            $project:{
                                fullname:1,
                                username:1,
                                avatar:1
                            }
                        }]
                        }
                    },{
                        $addFields:{
                            owner:{
                                $first:"$owner"
                            }
                        }
                    }
                ]
            }
        }
    ])

    return res.status(200)
    .json(
         new ApiResponse(
            200,
            users[0].watchHistroy,
            "watch history fetched successfully"
         )
    )
})
export { registeruser ,
    loginuser,
    logoutuser,
    verifyEmail,
    refreshaccesstoken,
    changecurrrentpassword,
    getcurrentuser,
    updateaccountdetails,
    updateuseravatar,
    updateusercoverimage,
    getuserchannelprofile,
    getwatchhistory
};