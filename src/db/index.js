import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';
const connectDB = async()=>{
    try{

        const connectionInstance = await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB host: ${connectionInstance.connection.host}`)

    }catch(error){
        console.log("MongoDb connection FAILED", process.env.MONGO_DB_URI,{DB_NAME}, error);
        process.exit(1)
    }
}

export default connectDB