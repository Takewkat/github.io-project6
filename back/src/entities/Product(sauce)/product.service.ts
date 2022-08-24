import mongoose from "mongoose";
import ProductModel from "./sauce.model";
const ApiError = require('../../exceptions/api.error');

export async function getAllProducts() {
  if (!ProductModel.find()) {
    throw new ApiError.BadRequest("No products found");
  }
  return await ProductModel.find(); 
}

export async function getProductById(id: string) {
  const product = await ProductModel.findById(id);
  if (!product) {
    throw new ApiError.BadRequest("Product not found");
  }
  return product;
}

export async function createProduct(product: {}, imageUrl: string) {
  const newProduct = await ProductModel.create({ ...product, imageUrl});
  return newProduct;
}

export async function updateProduct(userId: string, product: {}) {
  const updatedProduct = await ProductModel.findByIdAndUpdate(userId, product, { new: true });
  if (!mongoose.Types.ObjectId.isValid(userId) ) {
    throw new ApiError.Forbidden("You are not allowed to update this product");
  }
  return updatedProduct;
}

export async function deleteProduct(id: string) {
  const deletedProduct = await ProductModel.findByIdAndDelete(id);
  if (!deletedProduct) {
    throw new ApiError.BadRequest("Product not found");
  }
  return deletedProduct;
}