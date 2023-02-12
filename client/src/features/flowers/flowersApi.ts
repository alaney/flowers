import { Flower } from "../../types/Types";

export async function fetchFlowers(): Promise<Flower[]> {
  const resp = await fetch("/flowers");
  const flowers: Flower[] = await resp.json();
  return flowers;
}

export async function patchFlower(flower: Flower): Promise<Flower> {
  const resp = await fetch("/flowers", {
    method: "PATCH",
    body: JSON.stringify(flower),
  });
  const updatedFlower: Flower = await resp.json();
  return updatedFlower;
}
