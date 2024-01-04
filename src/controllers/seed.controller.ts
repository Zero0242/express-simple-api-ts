import { Request, Response } from "express";
import { AsyncResponse } from "../interfaces";
import { Shop, ShopDoc } from "../models";
import { makeShops } from "../helpers";

const fillShops = async (req: Request, res: Response): AsyncResponse => {
  await Shop.deleteMany({});

  const seedShops = makeShops();
  const shopsQuery: ShopDoc[] = Shop.buildMany(seedShops);
  const saves = await Shop.bulkSave(shopsQuery);
  return res.json({
    ok: true,
    message: "Semilla ejecutada",
    data: saves.insertedCount,
  });
};

export { fillShops };
