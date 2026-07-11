import mongoose from "mongoose";
import { subscription as Subscription } from "../models/subscription.model.js";
import { user as User } from "../models/user.model.js";
import { ApiError } from "../utils/apierror.js";
import { ApiResponse } from "../utils/apiresponse.js";
import { asyncHandler } from "../utils/asynchandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(channelid)) {
        throw new ApiError(400, "Invalid channel id");
    }
    if (channelid === req.user._id.toString()) {
        throw new ApiError(400, "You cannot subscribe to your own channel");
    }
    if (!await User.exists({ _id: channelid })) {
        throw new ApiError(404, "Channel not found");
    }

    const existingSubscription = await Subscription.findOne({
        subscriber: req.user._id,
        channel: channelid
    });

    const subscribed = !existingSubscription;
    if (existingSubscription) {
        await existingSubscription.deleteOne();
    } else {
        await Subscription.create({ subscriber: req.user._id, channel: channelid });
    }

    const subscriberCount = await Subscription.countDocuments({ channel: channelid });
    return res.status(200).json(
        new ApiResponse(200, { subscribed, subscriberCount }, subscribed ? "Subscribed" : "Unsubscribed")
    );
});

export { toggleSubscription };
