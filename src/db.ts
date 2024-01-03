import mongoose from "mongoose";
import { MONGO_CNN } from "./config";

export const DBConnection = async () => {
  try {
    await mongoose.connect(MONGO_CNN);
    console.log('Conexion exitosa');
    
  } catch (error) {
    console.error(error);
  }
};
