import multer from 'multer';

const storage = multer.memoryStorage(); // store file in memory
const upload = multer({ storage }); // initialize multer with storage config

export default upload; // ✅ export the configured upload middleware
