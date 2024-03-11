import bcrypt from "bcrypt";
import { Request, Response } from "express";
import fileUpload from "express-fileupload";
import { join } from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";
import { Usuario, UsuarioDoc } from "../models";
import { AsyncResponse } from "../interfaces";
import { errorResponse, signJWT } from "../helpers/";

const loginGet = async (req: Request, res: Response): AsyncResponse => {
  try {
    //@ts-ignore
    const id: string = req.uid;
    //@ts-ignore
    const usuario: UsuarioDoc = req.user;
    const token = signJWT({ id: usuario.id });
    return res.json({ ok: true, usuario, token });
  } catch (error) {
    return errorResponse({ res, message: "No Autorizado" });
  }
};
const loginPost = async (req: Request, res: Response): AsyncResponse => {
  try {
    const { email, password } = req.body;
    const usuario: UsuarioDoc | null = await Usuario.findOne({ email });
    if (!usuario) throw new Error("Credenciales Incorrectas");
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) throw new Error("Credenciales Incorrectas");
    const token = signJWT({ id: usuario.id });
    return res.json({ ok: true, usuario, token });
  } catch (error) {
    return errorResponse({ res, message: "Credenciales Incorrectas" });
  }
};

const registrarPost = async (req: Request, res: Response): AsyncResponse => {
  try {
    const { email, nombre, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const usuario: UsuarioDoc = Usuario.build({
      email,
      nombre,
      password: hashPassword,
    });
    await usuario.save();
    return res.json({ usuario });
  } catch (error) {
    return errorResponse({ res, message: `${error}` });
  }
};

const updateAvatar = async (req: Request, res: Response): AsyncResponse => {
  try {
    const file = req.files!.archivo as fileUpload.UploadedFile;
    const extension: string = file.mimetype.split("/")[1];
    // * Proceso subida de imagen
    //@ts-ignore
    const id: string = req.uid;
    //@ts-ignore
    const user: UsuarioDoc = req.user;
    const uploadsFolder = join(__dirname, "..", "..", "/public");
    if (user.avatar !== "") {
      const avatarPath = join(uploadsFolder, user.avatar);
      if (fs.existsSync(avatarPath)) {
        fs.unlinkSync(avatarPath);
      }
    }

    const relativePath = `/uploads/users/${uuid()}.${extension}`;

    const uploadPath = join(uploadsFolder, relativePath);

    await file.mv(uploadPath);
    const usuario = await Usuario.findByIdAndUpdate(
      id,
      { avatar: relativePath },
      { new: true }
    );
    return res.json({ ok: true, usuario });
  } catch (error: any) {
    return res.status(400).json({
      ok: false,
      msg: "Error al subir archivo",
      error: error.message.toString(),
    });
  }
};

export { registrarPost, loginGet, loginPost, updateAvatar };
