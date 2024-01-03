import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Usuario, UsuarioDoc } from "../models";
import { AsyncResponse } from "../interfaces";
import { errorResponse, signJWT } from "../helpers/";

const loginGet = async (req: Request, res: Response): AsyncResponse => {
  try {
    //@ts-ignore
    const id: string = req.user;
    const usuario: UsuarioDoc | null = await Usuario.findById(id);
    if (!usuario) throw new Error("Credenciales Incorrectas");
    const token = signJWT(usuario.id);
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
    const token = signJWT(usuario.id);
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

export { registrarPost, loginGet, loginPost };
