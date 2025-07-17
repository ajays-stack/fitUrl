import express from 'express'
import connect from './connnection.js';
import dotenv from 'dotenv';
import urlroute from "./routes/url.js";
import cors from 'cors'
import userRouter from './routes/user.js';
const app=express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use('/url',urlroute)
app.use('/user',userRouter)

connect(process.env.DB_URL,app);


