import mongoose from "mongoose";
import { defaultErrorMap } from "node_modules/zod/v3/errors.cjs";

const dbConnection = async(dbString : string) => {
    try{
        const connection = await mongoose.connect(dbString);
        console.log("DB Connected to : ", connection.connection.host);
    }catch(err){
        console.log("Connection Error : ", err);
    }
}

export default dbConnection;