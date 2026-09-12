import {ApiResponse} from "../utils/ApiResponse.js";
const getVideos = (req, res) => {
    const {offset, limit, search} = req.query;
    console.log(offset, limit, search,'kk')
    res.status(201).json(new ApiResponse(201, {offset, limit, search},"Videos fetched successfulll"))
}
const getVideoById = (req, res) =>{
    const {id} = req.params;
    console.log(id,'id')
    res.status(200).json(new ApiResponse(200, {id}, "Video fetched successfully"))
}
const addVideo = (req, res) =>{
    const {title, description, url, owner} = req.body;
    res.status(201).json(new ApiResponse(201, {title, description, url},"Video added successfully"))
}

const updateVideo = (req, res) => {
    const {title, description, url} = req.body;
    const {id} = req.params;
    res.status(200).json(new ApiResponse(200, {id,title,description, url}, "Video updated successfully"))
}



const deleteVideo = (req, res) =>{
    const {id} = req.params;
    res.status(200).json(new ApiResponse(200, {id}, "Video deleted successfully"))
}

export {addVideo, getVideos, getVideoById, updateVideo, deleteVideo}


/**
 * getVideos,
 * getVideoById,
 * addVideo,
 * updateVideo,
 * deleteVideo
 * 
 */