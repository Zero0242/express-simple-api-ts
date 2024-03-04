import { Schema } from "mongoose";

export interface Location {
  latitude: number;
  longitude: number;
}
export const locationSchema = new Schema(
  {
    latitude: Number,
    longitude: Number,
  },
  { _id: false }
);
