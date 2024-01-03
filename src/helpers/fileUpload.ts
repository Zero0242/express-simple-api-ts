import { Request } from "express";
import multer from "multer";
import path from "path";

const destination = path.join(__dirname, "..", "..", "/public/uploads");

const imageStorage = multer.diskStorage({
  destination,
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname);
  },
});

const filterImages = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  switch (file.mimetype) {
    case "image/jpeg":
    case "image/jpg":
    case "image/png":
      cb(null, true);
      break;
    default:
      cb(null, false);
      break;
  }
};

const imageUploads = multer({
  storage: imageStorage,
  fileFilter: filterImages,
});

export { imageUploads };
