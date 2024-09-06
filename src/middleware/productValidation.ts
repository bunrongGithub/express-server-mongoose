import { Request, Response, NextFunction } from 'express';
import * as yup  from 'yup';
import { Schema } from 'yup';
import { ProductType } from '../models/products.models'; // Adjust path if needed


// Define the validation schema
export const productSchema = yup.object<ProductType>({
    title: yup.string().required('Title is required'),
    desc: yup.string().required('Description is required'),
    qty: yup.number().required('Quantity is required').positive('Quantity must be a positive number'),
    category: yup.string().required('Category is required'),
    price: yup.number().required('Price is required').positive('Price must be a positive number')
});

export default function validation(models:Schema){
    return async (req: Request , res: Response , next: NextFunction) => {
        try {
            await models.validate(req.body, {
                abortEarly: false 
            });
            next();
        } catch (error: any) {
            if (error instanceof yup.ValidationError) {
                res.status(400).json({
                    message: 'Validation error',
                    errors: error.errors // Send all validation errors
                });
            }
            res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    }
}
