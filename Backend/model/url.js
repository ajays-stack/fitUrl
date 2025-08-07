import mongoose from "mongoose";
const Urlschema= new mongoose.Schema({
    
    shortId:{
        type:String,
        required:true,
        unique:true,
    },
    redirectUrl:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    views:{
        type:Number,
    },
    user:{
        type:String,
        required:true,
        
    }
}, {timestamps:true})

const Url=mongoose.model('urls',Urlschema)
export default Url;