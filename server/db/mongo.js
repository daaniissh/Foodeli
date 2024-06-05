import mongoose from "mongoose"

const connectDB = ()=>{
  mongoose.set("strictQuery")
  mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Connected to Mongo server")).catch((err)=>console.log(err,"failed to connect"))
}
export {connectDB}