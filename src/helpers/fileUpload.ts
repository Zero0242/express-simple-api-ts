import fileUpload from "express-fileupload";
import { join } from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";

type Collection = "users" | "posts";

export const uploadFile = async (
  collection: Collection,
  file: fileUpload.UploadedFile,
  previousUpload = ""
): Promise<string> => {
  const extension: string = file.mimetype.split("/")[1];
  const uploadsFolder = join(__dirname, "..", "..", "/public");
  if (previousUpload !== "") {
    const avatarPath = join(uploadsFolder, previousUpload);
    if (fs.existsSync(avatarPath)) {
      fs.unlinkSync(avatarPath);
    }
  }

  const relativePath = `/uploads/${collection}/${uuid()}.${extension}`;

  const uploadPath = join(uploadsFolder, relativePath);

  await file.mv(uploadPath);
  return relativePath;
};
