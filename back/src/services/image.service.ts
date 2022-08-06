import multer from 'multer';
import { Request } from 'express';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images');
  },
  filename: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});  

const fileFilter = (req: any,file: any,cb: any) => {
  if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
    cb(null, true);
  } else{
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
  }
};

const limits = {
  files: 10,
}

let imageService = multer({ storage: storage, fileFilter: fileFilter, limits: limits});

export default imageService.single('image');


