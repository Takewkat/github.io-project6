import mongoose from "mongoose";

interface IProduct {
    userId: string;
    name: string;
    manufacturer: string;
    description: string;
    mainPepper: string;
    imageUrl: string;
    heat: number;
}

const productSchema : mongoose.Schema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true }
});

const ProductModel = mongoose.model<IProduct>("Product", productSchema);

export default ProductModel;