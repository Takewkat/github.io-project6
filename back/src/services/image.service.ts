import multer from 'multer';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images');
  },
  filename: function (req: Request, file: Express.Multer.File, cb: any) {
    const name = Date.now() + "-" + file.originalname
    const hash = crypto.createHash('md5').update(name).digest('hex');
    cb(null, hash + path.extname(file.originalname));
  }
});  

const fileFilter = (req: any,file: any,cb: any) => {
  if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
    cb(null, true);
  } else{
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
  }
};

let upload = multer({ storage: storage, fileFilter: fileFilter });

function getImage(req: Request, res: Response, next: NextFunction) {
  
  const fullName = path.join(__dirname, '../..', './images', req.params.imageFileName)
  console.log(req.params.imageFileName, fullName);
  res.sendFile(fullName);
}


function deleteImage(req: Request, res: Response, next: NextFunction) {
  const fullName = path.join(__dirname, '../..', './images', res.locals.imageFileName)
  fs.unlink(fullName, (err: any) => {
    if (err) throw err;
  });
}

export default {
  upload: upload.single('image'),
  get: getImage,
  delete: deleteImage
}