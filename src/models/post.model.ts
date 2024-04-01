import { Model, Document, Schema, model } from "mongoose";
import { Image, imageSchema } from "./image.model";

interface IPost {
  titulo: string;
  descripcion: string;
  user: string;
  galeria?: Image[];
  privado?: boolean;
}

interface PostDoc extends Document {
  titulo: string;
  descripcion: string;
  user: string;
  galeria: Image[];
  privado?: boolean;
}

interface PostModelInterface extends Model<PostDoc> {
  build(attr: IPost): PostDoc;
}

const postSchema: Schema = new Schema(
  {
    titulo: {
      type: String,
      required: [true, "El titulo es obligatorio"],
    },
    descripcion: {
      type: String,
      required: [true, "La descripción es obligatoria"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "usuario",
      required: true,
    },
    galeria: {
      type: [imageSchema],
      index: true,
      default: [],
    },
    privado: {
      type: Boolean,
      default: false,
    },
    meta: {
      votos: Number,
    },
  },
  { timestamps: true }
);

postSchema.statics.build = (attr: IPost) => {
  return new Post(attr);
};

const Post = model<PostDoc, PostModelInterface>("post", postSchema);

export { Post, IPost, PostDoc };
