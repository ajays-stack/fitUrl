import mongoose from "mongoose";
const PORT=process.env.PORT||4000

const connect=async (url,app)=>{
    try {
        await mongoose.connect(url)
        console.log("mongodb connected")
    } catch (error) {
        console.log("mogodb not connected")
        
    }
    
app.listen(PORT,()=>{
    console.log("server  is connected")
})
}
export default connect;