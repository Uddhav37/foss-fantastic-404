import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    data: {
        type: Buffer,
        required: true
    },
    contentType: {
        type: String, 
        required: true
    },
    courseCode : {
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

const File = mongoose.model('Files', fileSchema);
export default File;