import { Schema } from "express-validator/src/middlewares/schema";

const createPostSchema: Schema = {
  titulo: {
    isLength: {
      options: { min: 3 },
      errorMessage: "El titulo es requerido",
    },
  },
  descripcion: {
    isLength: {
      options: { min: 3 },
      errorMessage: "La descripcion es requerido",
    },
  },
};

const updatePostSchema: Schema = {
  titulo: {
    optional: true,
    isString: true,
    isLength: {
      options: { min: 3 },
      errorMessage: "El titulo requiere minimo 3 caracteres",
    },
  },
  descripcion: {
    optional: true,
    isString: true,
    isLength: {
      options: { min: 3 },
      errorMessage: "La descripcion requiere minimo 3 caracteres",
    },
  },
  privado: {
    optional: true,
    isBoolean: true,
  },
};

export { createPostSchema, updatePostSchema };
