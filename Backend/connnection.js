import mongoose from "mongoose";
const PORT=process.env.PORT||4000

const connect=async (url,app)=>{
    await mongoose.connect(url)
app.listen(PORT,()=>{
    console.log("server  is connected")
})
}
export default connect;