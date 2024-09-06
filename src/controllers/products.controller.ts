import { NextFunction, Request,Response } from "express"
import { ProductModel } from "../models/products.models";
const getAllProducts = async (req: Request, res: Response, next:NextFunction) => {
    // Extract query parameters
    let page = parseInt(req.query.page as string) || 1;
    let limit = parseInt(req.query.limit as string) || 5;
    const category = req.query.category as string;
    const sort = req.query.sort as string;
    const stock = req.query?.stock as string;
    const sortBy = sort || 'price'; // Default to sorting by price
    const sortOrder = sortBy.startsWith('-') ? 'desc' : 'asc';
    const sortField = sortBy.startsWith('-') ? sortBy.substring(1) : sortBy;

    page = page > 0 ? page : 1;
    limit = limit > 0 ? limit : 5;
    
    /** Stock query */

    const condition: any = {}
    if (stock) {
        // Convert comma-separated stock values to an array of numbers
        const stockValues = stock.split(',').map(value => parseInt(value.trim(), 10));
        if (stockValues.length > 0) {
            condition.stock = { $gte: stockValues[0],$lte: stockValues[1] };
        }
    }
    if (category) {
        condition.category = category;
    }
    try {
        // Get the total count of documents matching the condition
        const totalCount = await ProductModel.countDocuments(condition);

        // Fetch the paginated data
        const products = await ProductModel.find(condition)
            .sort({[sortField]: sortOrder})
            .skip((page -1) * limit)
            .limit(limit)
            .select(['name','title', 'qty', 'desc', 'price', 'category','stock'])
            .exec();
        res.status(200).send({
            message: 'Request success!',
            data: {
                totalCount,
                products,
                page,
                limit,
                totalPage: Math.ceil(totalCount / limit),
                currentPage: page,
                hasNextPage: page * limit < totalCount,
                hasPreviousPage: page > 1
            }
        });
    } catch (error: any) {
        next(error)
    }
};
const createProduct = async (req: Request,res:Response) => {
    const {name,title,desc,qty,price,category,stock} = req.body;
    try {
        const product = new ProductModel({
            title,desc,name,qty,price,category,stock
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
const updateProduct = async (req:Request,res:Response) => {
    const id = req.params?.id;
    const {title,desc,name,qty,price, category} = req.body;
    try {        
        const result = await ProductModel.findByIdAndUpdate(id,{
            title,desc,name,qty,price,category
        },{new:true});
        res.status(200).send({
            message: `update success`,
            data: result
        })
    } catch (error) {
        console.log(error);
    } 
}
const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params?.id;
        const product = await ProductModel.findByIdAndDelete(id);
        if(!product){
            res.status(404).send({
                message: "Product not found"
            })
            return;
        }
        res.status(204).send({
            message: `deleted product success!`,
            data: product
        })
    } catch (error) {
        res.status(500).send({
            message: `Internal Server Error!`
        })
    }

}
export const productController = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
}