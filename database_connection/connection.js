
import mongoose from 'mongoose'
export const connectDB = async ()=>{

    try{
       const con =  await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
    });
        console.log(`MongoDB Connected at : ${con.connection.host}`);
    }catch(err){
        console.log("Error while connecting the Database", err);
        process.exit(1);
    }
}