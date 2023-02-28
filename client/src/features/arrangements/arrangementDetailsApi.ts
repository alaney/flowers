import { Arrangement } from "../../types/Types";

const patchArrangement = async (arrangement: Arrangement): Promise<Arrangement> => {
  arrangement.flowers = arrangement.flowers.filter((f) => f.name && f.count);
  arrangement.hardGoods = arrangement.hardGoods.filter((h) => h.name && h.price);

  if (arrangement.done) {
    arrangement.json = JSON.stringify(arrangement);
  }

  const resp = await fetch("/api/arrangements", { method: "PATCH", body: JSON.stringify(arrangement) });
  if (resp.status === 200) {
    const updatedArrangement: Arrangement = await resp.json();
    return updatedArrangement;
  } else {
    throw new Error();
  }
};

const postArrangement = async (arrangement: Arrangement): Promise<Arrangement> => {
  arrangement.flowers = arrangement.flowers.filter((f) => f.name && f.count);
  arrangement.hardGoods = arrangement.hardGoods.filter((h) => h.name && h.price);

  if (arrangement.done) {
    arrangement.json = JSON.stringify(arrangement);
  }

  const resp = await fetch("/api/arrangements", { method: "POST", body: JSON.stringify(arrangement) });
  if (resp.status === 200) {
    const updatedArrangement: Arrangement = await resp.json();
    return updatedArrangement;
  } else {
    throw new Error();
  }
};

export { patchArrangement, postArrangement };
