import { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";

export const fileValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files || !req.files.archivo) {
      throw new Error("Archivo no seleccionado");
    }
    const file = req.files.archivo as fileUpload.UploadedFile;
    const extension: string = file.mimetype.split("/")[1];
    const validExtensions = ["png", "jpg", "jpeg", "gif"];
    if (!validExtensions.includes(extension)) {
      throw new Error("Not valid file extension");
    }
    next();
  } catch (error: any) {
    return res.status(400).json({
      ok: false,
      msg: "Error al subir archivo",
      error: error.message.toString(),
    });
  }
};
export const multiFileValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files || !req.files.images) {
      throw new Error("Archivo no seleccionado");
    }
    const files = req.files.archivo as fileUpload.UploadedFile[];
    for (const file of files) {
      const extension: string = file.mimetype.split("/")[1];
      const validExtensions = ["png", "jpg", "jpeg", "gif"];
      if (!validExtensions.includes(extension)) {
        throw new Error("Not valid file extension");
      }
    }
    next();
  } catch (error: any) {
    return res.status(400).json({
      ok: false,
      msg: "Error al subir archivo",
      error: error.message.toString(),
    });
  }
};
