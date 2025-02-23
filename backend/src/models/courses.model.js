import mongoose from "mongoose";

const coursesSchema = mongoose.Schema({
    courseCode: {
        type: String, 
        required: true
    },
    subjectName: {
        type: String, 
        required: true
    },
    fileIds : {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'files'
    }
})

const Courses = mongoose.model('Courses', coursesSchema);
export default Courses;