import express , {Express, NextFunction, Request,Response} from "express";
import { ProductModel } from "./models/products.models";
import { productController } from "./controllers/products.controller";
import userRequestLog from "./middleware/userRequestLog";
const app: Express = express();

app.use(userRequestLog);
app.use(express.json());

/** Product API */

app.get("/products" , productController.getAllProducts);
app.post("/products",productController.createProduct);
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