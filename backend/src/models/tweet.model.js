import mongoose,{Schema} from "mongoose"

const tweetschema=new Schema(
    {
        content:{
            type:String,
            required:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"user"
        }
    },{
        timestamps:true
    }
)

export const tweet=mongoose.model("tweet",tweetschema)