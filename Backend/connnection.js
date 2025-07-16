import mongoose from "mongoose";


const connect=async (url,app)=>{
    await mongoose.connect(url)
app.listen(4000,()=>{
    console.log("server  is connected")
})
}
export default connect;