import mongoose,{Schema} from "mongoose"
import mongooseaggregatePaginate from "mongoose-aggregate-paginate-v2"
const videoSchema=new Schema(
    {
        videofile:{
            type:String,
            required:true
        }
        ,thumbnail:{
            type:String,
            required:true
        }
        
        ,title:{
            type:String,
            required:true
        }
        ,description:{
            type:String,
            required:true
        }
        ,duration:{
            type:Number,//from cloudinary
            required:true
        }
        ,views:{
            type:Number,//from cloudinary
            default:0
        }
        ,ispublished:{
            type:Boolean,//from cloudinary
            default:true
        }
        ,owner:{
            type:Schema.Types.ObjectId,
            ref:"user"
        }
    },{
        timestamps:true
    }
)

videoSchema.plugin(mongooseaggregatePaginate)

export const video= mongoose.model("video",videoSchema)