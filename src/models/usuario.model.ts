import mongoose from "mongoose";

/* Interface */
export interface IUsuario {
  nombre: string;
  email: string;
  password: string;
}
/* Interface Registro */
export interface UsuarioDoc extends mongoose.Document {
  nombre: string;
  email: string;
  password: string;
}

/* Interface Modelo Registrado */
interface UsuarioModelInterface extends mongoose.Model<UsuarioDoc> {
  build(attr: IUsuario): UsuarioDoc;
}

const usuarioSchema: mongoose.Schema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/* Para crear el doc antes de guardar */
usuarioSchema.statics.build = (attr: IUsuario) => {
  return new Usuario(attr);
};

export const Usuario = mongoose.model<UsuarioDoc, UsuarioModelInterface>(
  "usuario",
  usuarioSchema
);
