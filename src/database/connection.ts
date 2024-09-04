import mongoose from "mongoose";
import "dotenv/config";

export const connection = async () => {
    await mongoose.connect(`${process.env.MONGO_URL}`)
    console.log(`connection success!`);
}