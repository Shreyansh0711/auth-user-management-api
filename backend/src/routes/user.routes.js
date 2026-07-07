import { Router } from "express";
import { registeruser,generateAccessAndRefreshtoken,verifyEmail,loginuser,forgetPassword,resetpassword,logoutuser,refreshaccesstoken,changecurrrentpassword,getcurrentuser,updateaccountdetails,updateuseravatar,updateusercoverimage,getuserchannelprofile,getwatchhistory} from "../controllers/user.controller.js";
import{upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import passport from "../passport.js"
import {ApiError} from "../utils/apierror.js"
const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverimage",
            maxCount:1
        }
    ]),
    registeruser
);
router.get(
    "/google",
    passport.authenticate("google",{
        scope:["profile","email"]
    })
)
router.route("/google/callback")
    .get(passport.authenticate("google",{
    session:false,
    }),
    async(req,res)=>{
        {try {
            const user=req.user
    
            const{accesstoken,refreshtoken}=await generateAccessAndRefreshtoken(user._id)
            const options={
                httpOnly:true,
                secure:true,
            }
    
            return res
            .status(200)
            .cookie("accesstoken",accesstoken,options)
            .cookie("refreshtoken",refreshtoken,options)
            .json({
                message:"Google login successful",
                user,
            })
        } catch (error) {
            console.error(error);
            throw error;
            // throw new ApiError(
            //     500,
            //     "google authentication failed"
            // )
        }}
    }
)
router.route("/login").post(loginuser)
router.route("/logout").post(verifyJWT, logoutuser)
router.route("/refresh-token").post(refreshaccesstoken)
router.route("/forget-password").post(forgetPassword)
router.route("/reset-password").post(resetpassword)
router.route("/change-password").post(verifyJWT,changecurrrentpassword)

router.route("/current-user").get(verifyJWT,getcurrentuser)

router.route("/update-account").patch(verifyJWT,updateaccountdetails)
router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateuseravatar)

router.route("/cover-image").patch(verifyJWT,upload.single("coverimage"),updateusercoverimage)

router.route("/c/:username").get(verifyJWT,getuserchannelprofile)
router.route("/verify-email").get(verifyEmail);
router.route("/history").get(verifyJWT,getwatchhistory)

export default router;  
