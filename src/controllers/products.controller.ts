
import { Request,Response } from "express"
import { ProductModel } from "../models/products.models";
const getAllProducts = async (_req:Request,res:Response) => {
    try {
        const getProducts = await ProductModel.find();
        res.status(200).send({
            message: 'Request success!',
            data: getProducts
        })
    } catch (error: any) {
        console.log(error?.message)
    }
}

const createProduct = async (req: Request,res:Response) => {
    const {name,title,desc,qty,price} = req.body;
    try {
        const product = new ProductModel({
            title,desc,name,qty,price
        })
        await product.save();
        res.status(201).send({
            message: 'success create product!',
            data: product
        })
    } catch (error: any){
        res.status(500).send(`Error creating item: ${error.message}`);
    }
}


export const productController = {
    getAllProducts,
    createProduct,
}