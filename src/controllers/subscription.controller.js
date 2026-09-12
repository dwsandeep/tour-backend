import mongoose, {isValidObjectId} from "mongoose"
import {Subscription} from '../modals/subscription.model.js' 
import {User} from '../modals/user.model.js'
import { ApiResponse } from "../utils/ApiResponse.js";


const toggleSubscription =  async(req, res) => {
    const {channelId} = req.params;
    const {subscriber} = req.body;

    console.log(channelId)

    const channel = await User.findById(channelId)

    if(!channel){
         return res.status(404).json({
            success: false,
            message:'Channel not found',
        })
    }
    
    const alreadySubscribes = await Subscription.findOne({
        channel: channelId,
        subscriber: subscriber,
    })
    if(alreadySubscribes){
        await Subscription.findByIdAndDelete(
            alreadySubscribes?._id
        )
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Channel unsubscribed successfully"
            )
        )
    }
    const subscription = await Subscription.create({
        subscriber: subscriber,
        channel: channelId
    })

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            subscription,
            "Channel subscribed successfully"
        )
    )
    // TODO: toggle subscription
}

// controller to return subscriber list of a channel
const getUserChannelSubscribers =  (req, res) => {
    const {channelId} = req.params
}

// controller to return channel list to which user has subscribed
const getSubscribedChannels = (req, res) => {
    const { subscriberId } = req.params
    res.status(200).json({
        success: false
    })
}

const getUserById = async(req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json({
            success: true,
            data:user,
            message:'User fetched successfully'
        })
    }catch(err){
        console.log(err)
    }
}

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}