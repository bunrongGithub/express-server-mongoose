import express , {Express, NextFunction, Request,Response} from "express";
import { ProductModel } from "./models/products.models";
const app: Express = express();

app.use(express.json());
app.use((_req:Request,_res:Response,next:NextFunction) => {
    console.log(`Request time ${new Date().toLocaleDateString()}`);
    next();
})

/** Product API */

app.get("/products" , async (_req:Request,res:Response) => {
    try {
        const products = await ProductModel.find();
        res.status(200).send({
            message: "request success!",
            data: products
        });
    } catch (error) {
        console.error(error);
    }
});
app.post("/products", async (req:Request,res:Response)=> {
    const {title,desc,name,qty,price} = req.body;
    try {
        const newProduct = new ProductModel({
            title,desc,name,qty,price
        })
        await newProduct.save();
        res.status(201).send({
            message: 'success create product!',
            data: newProduct
        })
    } catch (error: any){
        res.status(500).send(`Error creating item: ${error.message}`);
    }
});
app.put("/products/:id",async (req:Request,res:Response) =>{
    const id = req.params?.id;
    const {title,desc,name,qty,price} = req.body; 
    const result = await ProductModel.findByIdAndUpdate(id,{
        title,desc,name,qty,price
    },{new:true});
    res.status(200).send({
        message: `update success`,
        data: result
    })
})
export default app;