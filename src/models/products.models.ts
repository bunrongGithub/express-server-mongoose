import mongoose , {Schema} from "mongoose";
type ProductType = {
    title: String;
    desc: String;
    name: String;
    qty: Number;
    price:Number;
}
const ProductSchema: Schema = new Schema<ProductType>({
    title: {type: String,required: true},
    desc: {type: String},
    name: {type: String,required: true},
    qty: {type: Number,required: true},
    price: {type: Number,required: true},
})
export const ProductModel = mongoose.model<ProductType>("product", ProductSchema)