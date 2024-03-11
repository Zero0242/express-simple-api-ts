import { Post, PostDoc } from "../models";

interface PostValidation {
  ok: boolean;
  post?: PostDoc | null;
}

export const validatePost = async (
  id: string,
  user: string
): Promise<PostValidation> => {
  const foundPost: PostDoc | null = await Post.findById(id);
  const isFromUser: boolean = `${foundPost?.user}` === user;
  if (foundPost != null && isFromUser) {
    return { ok: true, post: foundPost };
  }
  return { ok: false };
};
