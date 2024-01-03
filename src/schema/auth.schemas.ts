export const registerSchema = {
  nombre: {
    isLength: {
      options: {
        min: 3,
        errorMessage: "El nombre debe tener al menos 3 carácteres",
      },
    },
    errorMessage: "El nombre es requerido",
  },
  password: {
    notEmpty: true,
    isLength: {
      options: { min: 4 },
      errorMessage: "La contraseña ser al menos 4 carácteres",
    },
    errorMessage: "La contraseña es requerida",
  },
  email: {
    isEmail: {
      errorMessage: "Debe ser un email válido",
    },
    errorMessage: "El email es requerido",
  },
};
