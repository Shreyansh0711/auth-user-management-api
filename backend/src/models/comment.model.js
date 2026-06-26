import mongoose,{Schema} from "mongoose"
import mongooseaggregatePaginate from "mongoose-aggregate-paginate-v2"
const commentschema=new Schema({
    content:{
        type:String,
        required:true
    },
    video:{
        type:Schema.Types.ObjectId,
        ref:"video"
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }

},{timestamps:true})


commentschema.plugin(mongooseaggregatePaginate)

export const comment=mongoose.model("comment",commentschema)