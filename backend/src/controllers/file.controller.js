import mongoose from 'mongoose';
import multer from 'multer';

mongoose.connect("mongodb+srv://vermakumar527:ZBpoGaimEANZ60tT@cluster0.2xlqy.mongodb.net/college_db?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("Error in connection with MongoDB: " + err));


export const upload = async (req, res) => {
    try {
        const courseCode = req.body.coursecode; //from axios post request
    
        const newFile = new File({
          name: req.file.originalname,
          data: req.file.buffer,
          contentType: req.file.mimetype,
          courseCode
        });

        await newFile.save();
        res.status(201).send('File uploaded successfully!');
    }catch{
        res.status(500).send(`Error uploading file : ${err.messaage}`);
    }
};