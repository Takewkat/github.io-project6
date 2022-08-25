import mongoose from "mongoose"
import ProductModel from "./sauce.model"
import ApiError from '../../exceptions/api.error'

export async function getAllProducts() {
  if (!ProductModel.find()) {
    throw ApiError.NotFound("No products found");
  }
  return await ProductModel.find(); 
}

export async function getProductById(id: string) {
  const product = await ProductModel.findById(id);
  if (!product) {
    throw ApiError.NotFound("Product not found");
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
    throw ApiError.Forbidden("You are not allowed to update this product");
  }
  return updatedProduct;
}

export async function deleteProduct(id: string) {
  const deletedProduct = await ProductModel.findByIdAndDelete(id);
  if (!deletedProduct) {
    throw ApiError.NotFound("Product not found");
  }
  return deletedProduct;
}