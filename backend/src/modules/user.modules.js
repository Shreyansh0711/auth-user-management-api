import mongoose,{Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
const userSchema=new Schema(
    {
    username:{
        type:String,
        requied:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        requied:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        requied:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    avtar:{
        typr:String,//cloudinary url will be used
        requied:true,
    },
    coverimage:{
        type:String
    },
    watchhistory:{
        type:Schema.Type.ObjectId,
        ref:"video"
    },
    passowrd:{
        typr:String,
        requied:[true,'password is required']
    },
    refreshtoken:{
        type:String
    }
}   ,{timestamps:true}
)
userSchema.pre("save",async function(next){                                             
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10)
    next()
})
userSchema.methods.isvalidpassword=async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods,generateAccessToken=function(){
    jwt.sign(
        {
            _id:this._id,
            email : this.email,
            username : this.username,
            fullname:this.fullname
        },process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods,generateRefreshToken=function(){
    jwt.sign(
        {
            _id:this._id,
            email : this.email,
            username : this.username,
            fullname:this.fullname
        },process.env.REFRESH_TOKEN_SECRET,{
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const user=mongoose.model("user",userSchema)
