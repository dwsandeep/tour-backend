import mongoose, { Schema }  from "mongoose";
const courseSchema = new mongoose.Schema({
    url: String,
    title: String,
    views: Number,
    isPublished: Boolean,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps: true
}
)

export const Course = mongoose.model("Course", courseSchema)