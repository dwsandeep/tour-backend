import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../modals/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
const registerUser2 = asyncHandler(async (req, res) => {
  console.log("Method:", req.method);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  const { fullName, email, username, password } = req.body || {};

  res.json({
    success: true,
    fullName,
    email,
    username,
  });
});
const registerUser = asyncHandler(async (req, res) => {
  // console.log(req)
  const { fullName, email, username, password, avatar, coverImage } = req.body;
  console.log("email: ", email);

  // const {email, fullName, username, password} =req.body;

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    throw new ApiError(409, "User already exist.");
  }
  const user = await User.create({
    fullName,
    avatar: avatar ? avatar : "b.com",
    coverImage: coverImage ? "url" : "a.com",
    email,
    username: username.toLowerCase(),
    password,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );
  if (!createdUser) {
    throw new ApiError(500, "error in register");
  }
  res.status(201).json(new ApiResponse(200, createdUser, "user registerd"));
});

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: users,
      message: "data fetched succesfull",
    });
  } catch (err) {
    console.log(err);
  }
  // res.status(200).json(new ApiResponse(
  //     200,
  //     [{id:1, name:'sr'}],
  //     'fetched user data'
  // ))
};
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: user,
      message: "User fetched successfully",
    });
  } catch (err) {
    console.log(err);
  }
};
const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { courseId } = req.body;
  if (!courseId) {
    throw new ApiError(400, "courseId is required");
  }
  // const user = await User.findByIdAndUpdate(userId,
  //     {
  //         $pull: { watchHistory: courseId }
  //     },
  //     {
  //         new: true
  //     }
  //     )
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: {
        watchHistory: courseId,
      },
    },
    {
      new: true,
    },
  ).populate({
    path: "watchHistory",
    select: "title url",
  });
  return res.status(200).json(new ApiResponse(200, user, "Added to watchlist"));
};
const getWatchList = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  if (!userId) {
    throw new ApiError(400, "userId and courseId required.");
  }
  const user = await User.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(userId) },
    },
    {
      $project: {
        email: 1,
        username: 1,
        watchHistory: 1,
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistory",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  $project: {
                    username: 1,
                    email: 1,
                    fullName: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              owner: {
                $first: "$owner",
              },
            },
          },
        ],
      },
    },
  ]);
  return res
    .status(200)
    .json(new ApiResponse(200, user, "user fetched successfully."));
};
const getCourseProfile = async (req, res) => {
  const { username } = req.params;
  if (!username) {
    throw new ApiError(400, "username required");
  }
  const user = await User.aggregate([
    {
      $match: {
        username: username,
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        // localField: "_id",
        // foreignField: "channel",
        as: "subscribers",
        let: { channelId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$$channelId", "$channel"],
              },
            },
          },
          {
            $count: "count"
          },
          {
            $sort:{
              updatedAt:-1
            }
          },
          {
            $project:{
              subscriber: 1,
              updatedAt:1
            }
          },
          {
            $lookup:{
              from:"users",
              localField:"subscriber",
              foreignField:"_id",
              as: "subscriber",
              pipeline:[
                {
                  $project:{
                    username:1,
                    email:1,
                    fullName:1
                  }
                },
              ]
            }
          },
          {
            $addFields:{
              subscriber:{$first: "$subscriber"},
              subscribersCount:{
                $ifNull: [
                  {$first: "$subscribers.count"},
                  0
                ]
              }
            }
          }
        ],
      },
    },
  ]);
  return res.status(200).json(new ApiResponse(200, user, "Subscriber fetched"));
};

const oldgetCourseProfile = async (req, res) => {
  //check course id validation
  // get user by id
  // lookup for get course subscriber
  //lookup for my subscribed chabnnel
  //subscriber count
  //my subscribed count
  // remove unnecceessary field
  const { username } = req.params;
  if (!username) {
    throw new ApiError(400, "username is required");
  }

  // const newChannel = await User.aggregate([
  //     {
  //         $match:{
  //             username: username
  //         },
  //         $lookup:{
  //             from:"subscriptions",
  //             localField: "_id",
  //             foreignField: "channel",
  //             as: "subscribers"
  //         }
  //     }
  // ])
  const channel = await User.aggregate([
    {
      $match: {
        username: username,
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        let: {
          channelId: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$$channelId", "$channel"],
              },
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "subscriber",
              foreignField: "_id",
              as: "subscriber",
              pipeline: [
                {
                  $project: {
                    email: 1,
                    username: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              subscriber: { $first: "$subscriber" },
            },
          },
        ],
        as: "subscribers",
      },
      // $addFields:{
      //     subscribers:"$subscribers"
      // }
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        let: {
          channelId: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$$channelId", "$subscriber"],
              },
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "channel",
              foreignField: "_id",
              as: "subscribedTo",
              pipeline: [
                {
                  $project: {
                    email: 1,
                    username: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              subscribedTo: { $first: "$subscribedTo" },
            },
          },
        ],
        as: "myCourse",
      },
    },
    {
      $project: {
        fullName: 1,
        email: 1,
        subscribers: 1,
        myCourse: 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, channel, "data fetched successfully"));
};

// 6a4011275d477db0a96d9ba2 courseId
export {
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  getWatchList,
  getCourseProfile,
};
