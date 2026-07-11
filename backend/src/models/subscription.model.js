import mongoose, { Schema } from "mongoose"

const subscriptionschema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    channel: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
}, { timestamps: true })

subscriptionschema.index({ subscriber: 1, channel: 1 }, { unique: true });
export const subscription = mongoose.model("subscription", subscriptionschema)
