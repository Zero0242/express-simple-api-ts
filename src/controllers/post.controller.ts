import { Request, Response } from "express";
import fileUpload from "express-fileupload";
import { Post, PostDoc } from "../models";
import { AsyncResponse } from "../interfaces";
import {
  errorResponse,
  validatePost,
  parseInt,
  uploadFile,
  removeImage,
} from "../helpers";

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
  const limit = parseInt(req.query.limit) ?? 10;
  const offset = parseInt(req.query.offset) ?? 0;

  const posts: PostDoc[] = await Post.find({ privado: false }, undefined, {
    limit: limit,
    skip: offset,
  });
  return res.json({ ok: true, posts });
};

const getUserPost = async (req: Request, res: Response): AsyncResponse => {
  try {
    //@ts-ignore
    const user: string = req.uid;
    const posts: PostDoc[] = await Post.find({ user });
    return res.json({ ok: true, posts });
  } catch (e) {
    return errorResponse({ res, message: (e as Error).message });
  }
};

const makePost = async (req: Request, res: Response): AsyncResponse => {
  try {
    //@ts-ignore
    const user: string = req.uid;
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
    const user: string = req.uid;
    const { id } = req.params;
    const { descripcion, titulo, privado } = req.body;

    const { ok } = await validatePost(id, user);
    if (!ok) throw new Error("Post no encontrado");

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
    const user: string = req.uid;
    const { id } = req.params;
    const { ok } = await validatePost(id, user);
    if (!ok) throw new Error("Post no encontrado");

    const post: PostDoc | null = await Post.findByIdAndDelete(id, {
      new: true,
    });
    if (!post) throw new Error("Error al eliminar post");
    for (const { path } of post.galeria) {
      removeImage(path);
    }
    return res.json({ ok: true, post });
  } catch (e) {
    return errorResponse({ res, message: (e as Error).message });
  }
};

const postAddPhotos = async (req: Request, res: Response): AsyncResponse => {
  try {
    //@ts-ignore
    const user: string = req.uid;
    const { id } = req.params;
    const { imageID } = req.body;
    const { ok, post } = await validatePost(id, user);
    if (!ok) throw new Error("Post no encontrado");
    console.log({
      imageID,
      photos: post?.galeria,
      //@ts-ignore
      canUpdate: post?.galeria.map(({ id }) => id).includes(imageID),
    });

    const file = req.files!.archivo as fileUpload.UploadedFile;
    const { galeria } = post!;

    if (galeria.length > 5) {
      throw new Error("Ha superado el limite de imagenes");
    }
    const path = await uploadFile("posts", file, "");
    post!.galeria = [...galeria, { path }];

    await post!.save();

    return res.json({ ok: true, post });
  } catch (e) {
    return errorResponse({ res, message: (e as Error).message });
  }
};

export {
  getOnePost,
  getAllPost,
  makePost,
  updatePost,
  deletePost,
  getUserPost,
  postAddPhotos,
};
