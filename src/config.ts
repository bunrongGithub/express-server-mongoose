import dotenv from "dotenv";
dotenv.config({path: "src/configs/.env"});

export default {
    mongoURL: process.env.MONGO_URL as string,
    port: process.env.PORT,
}