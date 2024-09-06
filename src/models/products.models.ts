import mongoose , {Schema} from "mongoose";
export type ProductType = {
    title: String;
    category: String;
    desc: String;
    name: String;
    qty: Number;
    price:Number;
    stock: Number;
}
const ProductSchema: Schema = new Schema<ProductType>({
    title: {type: String,required: true},
    category: {type: String},
    desc: {type: String},
    name: {type: String,required: true},
    qty: {type: Number,required: true},
    price: {type: Number,required: true},
    stock: {type: Number, required: true}
})
export const ProductModel = mongoose.model<ProductType>("product", ProductSchema)