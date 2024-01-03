import { Model, Document, Schema, model } from "mongoose";

interface IPost {
  titulo: string;
  descripcion: string;
  user: string;
  privado?: boolean;
}

interface PostDoc extends Document {
  titulo: string;
  descripcion: string;
  user: string;
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

const Post = model<PostDoc, PostModelInterface>("post", postSchema);

postSchema.statics.build = (attr: IPost) => new Post(attr);

export { Post, IPost, PostDoc };
