import { faker } from "@faker-js/faker";
import { IShop } from "../models";

const makeShops = (registros: number = 30): IShop[] => {
  const items: IShop[] = [];
  for (let index = 0; index < registros; index++) {
    const newShop: IShop = {
      nombre: faker.company.name(),
      description: faker.company.catchPhrase(),
      galeria: makeGallery(),
      coords: {
        latitude: faker.location.latitude({ max: -41, min: -18, precision: 5 }),
        longitude: faker.location.longitude({
          max: -72,
          min: -68,
          precision: 5,
        }),
      },
    };
    items.push(newShop);
  }

  return items;
};

const makeGallery = (registros: number = 5): string[] => {
  const tempGallery: string[] = [];

  for (let index = 0; index < registros; index++) {
    tempGallery.push(faker.image.urlPicsumPhotos());
  }

  return tempGallery;
};

export { makeShops, makeGallery };
