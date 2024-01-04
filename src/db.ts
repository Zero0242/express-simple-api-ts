import mongoose from "mongoose";
import { MONGO_CNN } from "./config";

export const DBConnection = async () => {
  try {
    console.log('Conectando a base de datos...');
    await mongoose.connect(MONGO_CNN);
    console.log('Base de datos online');    
  } catch (error) {
    console.error(error);
  }
};
