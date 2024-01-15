import { FileFilterCallback } from "multer";
import { Request } from "express";
import { v4 as uuid } from "uuid";

import { unlinkSync, existsSync } from "fs";

const filterImages = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
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

const checkFile = async (filename: string) => {
  const file: boolean = existsSync(filename);
  if (file) {
    unlinkSync(filename);
  }
};

const getUniqueName = (file: Express.Multer.File): string => {
  const [extension] = file.originalname.split(".").reverse();
  const uniqueFileName: string = uuid() + "." + extension;

  return uniqueFileName;
};

export { filterImages, checkFile, getUniqueName };
