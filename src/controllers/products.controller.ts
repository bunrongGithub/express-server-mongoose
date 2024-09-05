import { Request,Response } from "express"
import { ProductModel } from "../models/products.models";
const getAllProducts = async (req: Request, res: Response) => {
    // Extract query parameters
    let start = parseInt(req.query.start as string) || 0;
    let limit = parseInt(req.query.limit as string) || 5;
    
    const category = req.query.category as string;

    const startIndex = (start - 1) * limit;
    const endIndex = start * limit;
    // Ensure start and limit are valid numbers
    if (isNaN(start) || start < 0) start = 0;
    if (isNaN(limit) || limit <= 0) limit = 5;

  
    const condition: any = {}
    if(category){
        condition.category = category;
    }
    try {
        // Get the total count of documents matching the condition
        const totalCount = await ProductModel.countDocuments(condition);

        // Fetch the paginated data
        const products = await ProductModel.find(condition)
            .sort({category:1})
            .skip(startIndex)
            .limit(endIndex)
            .select(['name','title', 'qty', 'desc', 'price', 'category'])
            .exec();

        res.status(200).send({
            message: 'Request success!',
            data: {
                totalCount,
                products,
                start,
                limit,
                totalPage: Math.ceil(totalCount / limit),
                currentPage: start,
                hasNextPage: start * limit < totalCount,
                hasPreviousPage: start > 1
            }
        });
    } catch (error: any) {
        console.error(error?.message);
        res.status(500).send({ message: 'Internal server error' });
    }
};
const createProduct = async (req: Request,res:Response) => {
    const {name,title,desc,qty,price,category} = req.body;
    try {
        const product = new ProductModel({
            title,desc,name,qty,price,category
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