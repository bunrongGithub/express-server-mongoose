import { Response,Request,NextFunction } from "express";
const userRequestLog = 
(async (_req:Request,_res:Response,next:NextFunction) => {
    console.log(`Request at time: ${new Date().toLocaleDateString()}`)
    next();
})
export default userRequestLog;