import express from 'express';
import authUser from '../middleware/auth.js';
import upload from '../config/multer.js'; // multer config
import { getimagedata, imageupload,deleteimage } from '../controller/shorten.js'; // controller function

const imageRouter = express.Router();

// NOTE: added '/' before 'upload' in the route
imageRouter.post('/upload', upload.single('image'),authUser, imageupload);
imageRouter.get('/fetch',authUser,getimagedata)
imageRouter.delete('/delete',authUser,deleteimage)
export default imageRouter;
