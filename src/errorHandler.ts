import {Request,Response,NextFunction} from "express";

interface ErrorHandler extends Error {
    statusCode?: number; 
}
const errorHandler = 
(err:ErrorHandler , req: Request, res:Response , next:NextFunction) => 
{
    const statusCode = err.statusCode || 500;
    const message = err.message || `Internal Server Error!`
    console.error(err);

    res.status(statusCode).json({
        success: false,
        message: message,
        ...(process.env.NODE_ENV === 'development' && { error: err })
    })
}

export default errorHandler;