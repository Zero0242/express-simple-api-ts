import { Schema } from "express-validator";

const registerSchema: Schema = {
  nombre: {
    isLength: {
      options: { min: 3 },
      errorMessage: "El nombre debe tener al menos 3 carácteres",
    },
  },
  password: {
    isLength: {
      options: { min: 4 },
      errorMessage: "La contraseña ser al menos 4 carácteres",
    },
  },
  email: {
    isEmail: {
      errorMessage: "Debe ser un email válido",
    },
  },
};

export { registerSchema };
