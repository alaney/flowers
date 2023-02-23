import { Arrangement } from "../../types/Types";

const patchArrangement = async (arrangement: Arrangement): Promise<Arrangement> => {
  arrangement.flowers = arrangement.flowers.filter((f) => f.name);
  arrangement.hardGoods = arrangement.hardGoods.filter((h) => h.name && h.price);
  const resp = await fetch("/api/arrangements", { method: "PATCH", body: JSON.stringify(arrangement) });
  const updatedArrangement: Arrangement = await resp.json();
  return updatedArrangement;
};

const postArrangement = async (arrangement: Arrangement): Promise<Arrangement> => {
  arrangement.flowers = arrangement.flowers.filter((f) => f.name);
  arrangement.hardGoods = arrangement.hardGoods.filter((h) => h.name && h.price);
  const resp = await fetch("/api/arrangements", { method: "POST", body: JSON.stringify(arrangement) });
  const updatedArrangement: Arrangement = await resp.json();
  return updatedArrangement;
};

export { patchArrangement, postArrangement };
