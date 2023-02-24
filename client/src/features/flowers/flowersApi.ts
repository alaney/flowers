import { Flower } from "../../types/Types";

export async function fetchFlowers(): Promise<Flower[]> {
  const resp = await fetch("/api/flowers");
  const flowers: Flower[] = await resp.json();
  return flowers;
}

export async function patchFlower(flower: Flower): Promise<Flower> {
  const resp = await fetch("/api/flowers", {
    method: "PATCH",
    body: JSON.stringify(flower),
  });
  if (resp.status === 200) {
    const updatedFlower: Flower = await resp.json();
    return updatedFlower;
  } else {
    throw new Error("Error");
  }
}

export async function createFlower(flower: Flower): Promise<Flower> {
  const resp = await fetch("/api/flowers", {
    method: "POST",
    body: JSON.stringify(flower),
  });
  if (resp.status === 200) {
    const newFlower: Flower = await resp.json();
    return newFlower;
  } else {
    throw new Error("error");
  }
}
