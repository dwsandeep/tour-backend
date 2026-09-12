import {ApiResponse} from '../utils/ApiResponse.js';
import {Course} from '../modals/course.model.js' 
const getCourse = (req, res) =>{
    const {offset, limit, search} = req.query;
    res.status(200).json(new ApiResponse(200, {offset}))
}

const getCourseById =(req, res) =>{
    const {id} = req.params;
    res.status(200).json(new ApiResponse(200, {id}, "Course fetched successfully"))
}

const addCourse = async(req, res) =>{
    const {title, url,isPublished=false,owner } = req.body;
    
    const course = await Course.create({
        url: url,
        title: title,
        isPublished: isPublished,
        owner: owner
    })
    const createdCourse = await Course.findById(course?._id).select("-url -updatedAt")
    res.status(201).json(new ApiResponse(201, createdCourse, "Course added successfully"))
}

const updateCourse = (req, res) =>{
    const {title, description} = req.body;
    const {id} = req.params;
    res.status(200).json(new ApiResponse(200, {id, title, description}, "Course updated successfully"))
}

const deleteCourse = (req, res) =>{
    const {id} = req.params;
    res.status(200).json(new ApiResponse(200, {id}, "Course deleted successfully"))
}

export {getCourse, getCourseById, addCourse, updateCourse, deleteCourse}