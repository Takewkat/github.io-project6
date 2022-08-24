import mongoose from "mongoose";

interface ISauce {
    userId: string;
    name: string;
    manufacturer: string;
    description: string;
    mainPepper: string;
    imageUrl: string;
    heat: number;
    likes : number;
    dislikes : number;
    usersLiked : [] ;
    usersDisliked : []
}

const sauceSchema : mongoose.Schema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes : { type: Number, default: 0},
    dislikes : { type: Number, default: 0 },
    usersLiked : { type: [String], default: [] },
    usersDisliked : { type: [String], default: [] }
});

const ProductModel = mongoose.model<ISauce>("Sauce", sauceSchema);

export default ProductModel;