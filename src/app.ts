import express , {Express, NextFunction} from "express";
import { productController } from "./controllers/products.controller";
import userRequestLog from "./middleware/userRequestLog";
import validation , {productSchema} from "./middleware/productValidation";
const app: Express = express();

app.use(userRequestLog);
app.use(express.json());

/** Product API */



app.get("/products",productController.getAllProducts);
app.post("/products",validation(productSchema),productController.createProduct);
app.put("/products/:id",productController.updateProduct);
app.delete("/products/:id", productController.deleteProduct);
export default app;