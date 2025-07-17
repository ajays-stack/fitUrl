import {short,getredirect} from "../controller/shorten.js";
import authUser from '../middleware/auth.js'
import getdata from "../controller/getdata.js";
import express from 'express'
import handleDelete from "../controller/handleDelete.js";
const urlroute=express.Router();
urlroute.post('/short',authUser,short);
urlroute.get('/getdata',authUser,getdata)
urlroute.post('/delete',authUser,handleDelete);
urlroute.get('/:id',getredirect);


export default urlroute