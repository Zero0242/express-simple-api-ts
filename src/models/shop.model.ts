import { Schema, Document, Model, model } from "mongoose";

interface Location {
  latitude: number;
  longitude: number;
}

interface IShop {
  nombre: string;
  description: string;
  galeria: string[];
  coords: Location;
}

interface ShopDoc extends Document {
  nombre: string;
  description: string;
  galeria: string[];
  coords: Location;
}

interface ShopModelInterface extends Model<ShopDoc> {
  build(attr: IShop): ShopDoc;
  buildMany(attr: IShop[]): ShopDoc[];
}

const locationSchema = new Schema(
  {
    latitude: Number,
    longitude: Number,
  },
  {
    autoIndex: false,
    timestamps: false,
  }
);

const shopSchema: Schema = new Schema(
  {
    nombre: String,
    description: String,
    galeria: {
      type: [String],
      index: true,
    },
    location: locationSchema,
  },
  {
    timestamps: true,
  }
);

shopSchema.statics.build = (attr: IShop) => {
  return new Shop(attr);
};

shopSchema.statics.buildMany = (attr: IShop[]) => {
  return attr.map((shop) => new Shop(shop));
};

const Shop = model<ShopDoc, ShopModelInterface>("shop", shopSchema);

export { Shop, ShopDoc, IShop };
