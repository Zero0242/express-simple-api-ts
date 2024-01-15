import { Request } from "express";
import multer from "multer";
import path from "path";
import { checkFile, filterImages, getUniqueName } from "./fileHelpers";

const destination = path.join(__dirname, "..", "..", "/public/uploads");

let fileList: string[] = [];

const imageStorage = multer.diskStorage({
  destination,
  filename: function (req: Request, file: Express.Multer.File, cb: any) {
    const newFileName = getUniqueName(file);

    fileList = [...fileList, `${destination}/${newFileName}`];

    if (fileList[0]) {
      console.log(fileList[0]);
      
      checkFile(fileList[0]);
    }
    console.log(fileList);

    cb(null, newFileName);
  },
});

const imageUploads = multer({
  storage: imageStorage,
  fileFilter: filterImages,
});

export { imageUploads };
