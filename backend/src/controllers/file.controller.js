import mongoose from 'mongoose';
import File from '../models/file.model.js';
import Courses from '../models/courses.model.js';
import courseList from '../models/coursList.model.js'

const db = await mongoose.connect("mongodb+srv://vermakumar527:ZBpoGaimEANZ60tT@cluster0.2xlqy.mongodb.net/college_db?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("Error in connection with MongoDB: " + err));


export const upload = async (req, res) => {
    try {
        const newFile = new File({
          name: req.file.originalname,
          data: req.file.buffer,
          contentType: req.file.mimetype,
          subjectName: req.body.subjectName,   //from axios post request
          courseCode: req.body.courseCode,
          universityName: req.body.universityName
        });
        await newFile.save();
        let subject = await Courses.findOne({courseCode: req.body.courseCode});
        if(subject){
            if(!subject.fileIds.includes(newFile._id)){
                subject.fileIds.push(newFile._id);
                await subject.save();
            }else{
            }
        }else{
            subject = new Courses({
                courseCode: req.body.courseCode,
                subjectName: req.body.subjectName,
                universityName: req.body.universityName,
                fileIds: [newFile._id]
            });
            let courselist = new courseList({
                courseCodeList: req.body.courseCode
            });
            console.log(req.body.courseCode);
            await subject.save();
            await courselist.save();
        }
        res.status(201).send('File uploaded successfully!');
    }catch(err){
        res.status(500).send(`Error uploading file : ${err.messaage}`);
    }
};


//returns some information about the files with given courseCode
//to be used as state in react component
export const getTagFiles = async(req, res) => {
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

//view a pdf file, file is fetched from database using id

export const showFileById = async (req, res) => {
    try {
        const id = req.params.id; // This should be a valid ObjectId
        const resFile = await File.findById(id);
        if (!resFile) {
            return res.status(404).send("File not found!");
        }
        res.contentType('application/pdf');
        res.send(resFile.data); // Sending the PDF
    } catch (err) {
        res.status(500).send("Error fetching the file: " + err.message);
    }
};

export const showFilesByCourseCode = async (req, res) => {
    //const await Courses.find({courseCode: req.body.courseCode});
    
}

export const showAllFiles = async (req, res) => {
    const courseCodes = await courseList.find({}, 'courseCodeList');
    const codes = courseCodes.map(doc => doc.courseCode);
    console.log(codes);
};