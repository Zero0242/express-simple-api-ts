import { Request, Response } from "express";
import { Post, PostDoc } from "../models";
import { AsyncResponse } from "../interfaces";
import { errorResponse } from "../helpers";

const getOnePost = async (req: Request, res: Response): AsyncResponse => {
  try {
    const { id } = req.params;
    const post: PostDoc | null = await Post.findById(id);
    if (!post) throw new Error("Post no encontrado");
    return res.json({ ok: true, post });
  } catch (e) {
    return errorResponse({ res, message: (e as Error).message });
  }
};

const getAllPost = async (req: Request, res: Response): AsyncResponse => {
  const posts: PostDoc[] = await Post.find({ privado: false });
  return res.json({ ok: true, posts });
};

const getUserPost = async (req: Request, res: Response): AsyncResponse => {
  try {
    //@ts-ignore
    const user: string = req.user;
    const posts: PostDoc[] = await Post.find({ user });
    return res.json({ ok: true, posts });
  } catch (e) {
    return errorResponse({ res, message: (e as Error).message });
  }
};

const makePost = async (req: Request, res: Response): AsyncResponse => {
  try {
    //@ts-ignore
    const user: string = req.user;
    const { descripcion, titulo } = req.body;
    const postQuery: PostDoc = Post.build({ descripcion, titulo, user });
    const post: PostDoc = await postQuery.save();
    return res.json({ ok: true, post });
  } catch (e) {
    return errorResponse({ res, message: (e as Error).message });
  }
};

const updatePost = async (req: Request, res: Response): AsyncResponse => {
  try {
    //@ts-ignore
    const user: string = req.user;
    const { id } = req.params;
    const { descripcion, titulo, privado } = req.body;

    const validSelection: boolean = await checkValidity(id, user);
    if (!validSelection) throw new Error("Post no encontrado");

    const post: PostDoc | null = await Post.findByIdAndUpdate(
      id,
      { descripcion, titulo, privado },
      { new: true }
    );
    if (!post) throw new Error("Error al actualizar");
    await post.save();
    return res.json({ ok: true, post });
  } catch (e) {
    return errorResponse({ res, message: (e as Error).message });
  }
};

const deletePost = async (req: Request, res: Response): AsyncResponse => {
  try {
    //@ts-ignore
    const user: string = req.user;
    const { id } = req.params;
    const validSelection = await checkValidity(id, user);
    if (!validSelection) throw new Error("Post no encontrado");

    const post: PostDoc | null = await Post.findByIdAndDelete(id, {
      new: true,
    });
    if (!post) throw new Error("Error al eliminar post");
    return res.json({ ok: true, post });
  } catch (e) {
    return errorResponse({ res, message: (e as Error).message });
  }
};

const checkValidity = async (id: string, user: string): Promise<boolean> => {
  const foundPost: PostDoc | null = await Post.findById(id);
  const isFromUser: boolean = `${foundPost?.user}` === user;
  return foundPost != null && isFromUser;
};

export {
  getOnePost,
  getAllPost,
  makePost,
  updatePost,
  deletePost,
  getUserPost,
};
