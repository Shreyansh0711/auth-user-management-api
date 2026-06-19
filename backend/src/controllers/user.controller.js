import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierror.js";
import { user as User } from "../models/user.model.js";
import { uploadoncloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiresponse.js";
import jwt from "jsonwebtoken"
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

    // fetch safe user
    const finalUser = await User.findById(createdUser._id).select(
        "-password -refreshtoken"
    );

    if (!finalUser) {
        throw new ApiError(500, "Something went wrong");
    }

    return res.status(201).json(
        new ApiResponse(200, finalUser, "User created successfully")
    );
});
const loginuser=asyncHandler(async(req,res)=>{
    const{email,username,password} =req.body
    if(!username&&!email){
        throw new ApiError(400,"username or email is required")
    }
    const user = await User.findOne({
    $or: [{ username }, { email }]
}); 
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
export { registeruser ,
    loginuser,
    logoutuser,
    refreshaccesstoken
};