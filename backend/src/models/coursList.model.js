import mongoose from "mongoose";

const courselistschema = mongoose.Schema({
    courseCodeList: {
        type: String,
        required: true
    }
});

const courseList = mongoose.model('courseCodeList', courselistschema);
export default courseList;