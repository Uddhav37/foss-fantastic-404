

import multer from 'multer';

// Configure Multer (In-memory storage for MongoDB)
const storage = multer.memoryStorage();
export const uploadLimit = multer({ storage }).single('file');
