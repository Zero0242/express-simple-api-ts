import { Request, Response } from "express";
import fileUpload from "express-fileupload";
import { join } from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";
import { Post, PostDoc } from "../models";
import { AsyncResponse } from "../interfaces";
import { errorResponse, validatePost } from "../helpers";

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
    const { ok, post } = await validatePost(id, user);
    if (!ok) throw new Error("Post no encontrado");

    const gallery = req.files!.images as fileUpload.UploadedFile[];
    const uploadsFolder = join(__dirname, "..", "..", "/public");
    let images: string[] = [];
    for (const photo of gallery) {
      const extension: string = photo.mimetype.split("/")[1];
      const relativePath = `/uploads/posts/${uuid()}.${extension}`;
      const uploadPath = join(uploadsFolder, relativePath);
      await photo.mv(uploadPath);
      images = [...images, uploadPath];
    }

    for (const photo of post!.galeria) {
      if (photo !== "") {
        const avatarPath = join(uploadsFolder, photo);
        if (fs.existsSync(avatarPath)) {
          fs.unlinkSync(avatarPath);
        }
      }
    }

    post!.galeria = images;
    await post?.save();

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
