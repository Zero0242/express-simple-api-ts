import { Schema } from "mongoose";

export interface Image {
  path: string;
}
export const imageSchema = new Schema({
  path: String,
});
