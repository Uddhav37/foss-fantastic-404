import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadLimit = (req, res, next) => {
    upload.single('file');
}