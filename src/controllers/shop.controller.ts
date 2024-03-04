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

const getAllShops = async (req: Request, res: Response): AsyncResponse => {
  const shops: ShopDoc[] = await Shop.find({});

  return res.json({
    ok: true,
    shops,
  });
};

const registerShop = async (req: Request, res: Response): AsyncResponse => {
  const { description, nombre, latitude, longitude } = req.body;
  const shopQuery: ShopDoc = Shop.build({
    description,
    nombre,
    location: { latitude, longitude },
  });

  const shop = await shopQuery.save();

  return res.json({ ok: true, shop });
};

export { fillShops, getAllShops, registerShop };
