import mongoose from 'mongoose';
import File from '../models/file.model.js';

mongoose.connect("mongodb+srv://vermakumar527:ZBpoGaimEANZ60tT@cluster0.2xlqy.mongodb.net/college_db?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("Error in connection with MongoDB: " + err));


export const upload = async (req, res) => {
    const {courseCode,subject} = req.body;

    // console.log(req.file.originalname);
    // console.log(req.file.buffer);
    // console.log(req.file.mimetype);
    try {
        const courseCode = req.body.courseCode; //from axios post request
    
        const newFile = new File({
          name: req.file.originalname,
          data: req.file.buffer,
          contentType: req.file.mimetype,
          courseCode
        });
        console.log(newFile);
        await newFile.save();
        res.status(201).send('File uploaded successfully!');
    }catch(err){
        res.status(500).send(`Error uploading file : ${err.messaage}`);
    }
};

