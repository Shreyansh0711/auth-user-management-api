import mongoose,{Schema} from "mongoose"

const playlistschema=new Schema(
    {
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        videos:[{
            type:Schema.Types.ObjectId,
            ref:"video",
            default:[]
        }],
        owner:{
            type:Schema.Types.ObjectId,
            ref:"user"
        }
    },{
        timestamps:true
    }
)

export const playlist=mongoose.model("playlist",playlistschema)