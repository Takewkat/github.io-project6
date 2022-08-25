import ApiError from '../../exceptions/api.error'
import { Request, Response, NextFunction } from 'express'
import * as ProductService from './product.service';

async function setImageFileName(req: Request, res: Response) {
  const sauce = await ProductService.getProductById(req.params.id);
  const imageFileName = sauce.imageUrl.split('/api/images/')[1];
  res.locals.imageFileName = imageFileName
}

export async function getAllSauces(req: Request, res: Response, next: NextFunction) {
  try {
    const sauces = await ProductService.getAllProducts();
    res.status(200).json(sauces);
  } catch (error) {
    next(error);
  }
}

export async function getSauceById(req: Request, res: Response, next: NextFunction) {
  try {
    const sauce = await ProductService.getProductById(req.params.id);
    res.status(200).json(sauce);
    console.log("Sauce info: ", sauce);
  }
  catch (error) {
    next(error);
  }
}

export async function createSauce(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.file) {
      throw ApiError.BadRequest('No image provided');
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/api/images/${req.file.filename}`;
    // { sauce: String, image: File }
    const parsedBody = JSON.parse(req.body.sauce);
    const sauceForm = await ProductService.createProduct(parsedBody, imageUrl);
    res.status(201).json({message: 'Sauce created', sauceForm});
  }
  catch (error) {
    next(error);
  }
}

export async function updateSauce(req: Request, res: Response, next: NextFunction) {
  try {
    let product =  { ...req.body }
    if (req.file) {
      await setImageFileName(req, res);
      product = {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/api/images/${req.file.filename}`
      }
    }
    const sauceForm = await ProductService.updateProduct(req.params.id, product);
    res.status(200).json({message: 'Sauce updated', sauceForm});
    next()
  }
  catch (error) {
    next(error);
  }
}

export async function deleteSauce(req: Request, res: Response, next: NextFunction) {
  try {
    await setImageFileName(req, res);
    await ProductService.deleteProduct(req.params.id);
    res.status(200).json({message: 'Sauce deleted'});
    next();
  }
  catch (error) {
    next(error);
  }
}