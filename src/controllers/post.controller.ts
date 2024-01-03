import { Request, Response } from "express";
import { Post, PostDoc } from "../models";
import { AsyncResponse } from "../interfaces";

const getOnePost = async (req: Request, res: Response): AsyncResponse => {
  const { id } = req.params;

  const post: PostDoc | null = await Post.findById(id);

  return res.json({ ok: true, post });
};

const getAllPost = async (req: Request, res: Response): AsyncResponse => {
  const posts: PostDoc[] = await Post.find({ privado: false });
  return res.json({ ok: true, posts });
};

const getUserPost = async (req: Request, res: Response): AsyncResponse => {
  //@ts-ignore
  const user: string = req.user;
  const posts: PostDoc[] = await Post.find({ user });
  return res.json({ ok: true, posts });
};

const makePost = async (req: Request, res: Response): AsyncResponse => {
  //@ts-ignore
  const user: string = req.user;
  const { descripcion, titulo } = req.body;

  const postQuery: PostDoc = Post.build({ descripcion, titulo, user });

  const post: PostDoc = await postQuery.save();

  return res.json({ ok: true, post });
};

const updatePost = async (req: Request, res: Response): AsyncResponse => {
  //@ts-ignore
  const user: string = req.user;
  const { id } = req.params;
  const { descripcion, titulo, privado } = req.body;

  const post: PostDoc | null = await Post.findOneAndUpdate(
    { id, user },
    { descripcion, titulo, privado },
    { new: true }
  );
  return res.json({ ok: true, post });
};

const deletePost = async (req: Request, res: Response): AsyncResponse => {
  //@ts-ignore
  const user: string = req.user;
  const { id } = req.params;

  const post: PostDoc | null = await Post.findOneAndDelete(
    { id, user },
    {
      new: true,
    }
  );
  return res.json({ ok: true, post });
};

export {
  getOnePost,
  getAllPost,
  makePost,
  updatePost,
  deletePost,
  getUserPost,
};
