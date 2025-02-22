import mongoose from 'mongoose';
import File from '../models/file.model.js';

mongoose.connect("mongodb+srv://vermakumar527:ZBpoGaimEANZ60tT@cluster0.2xlqy.mongodb.net/college_db?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("Error in connection with MongoDB: " + err));


export const upload = async (req, res) => {
    const {courseCode,subject} = req.body;
    try {
        const courseCode = toString(req.body.courseCode); //from axios post request
    
        const newFile = new File({
          name: req.file.originalname,
          data: req.file.buffer,
          contentType: req.file.mimetype,
          courseCode
        });
        await newFile.save();
        res.status(201).send('File uploaded successfully!');
    }catch(err){
        res.status(500).send(`Error uploading file : ${err.messaage}`);
    }
};

//returns some information about the files with given courseCode
//to be used as state in react component
export const showFile = async(req, res) => {
    try{
        const courseCode = req.params.courseCode;
        const files = await File.find({courseCode});
        res.json(files.map(file => ({
            id: file._id,
            name: file.name,
            courseCode: file.courseCode,
        })));
    }catch(err){
        res.status(500).send("Error fetching files: " + err.message);
    }
}