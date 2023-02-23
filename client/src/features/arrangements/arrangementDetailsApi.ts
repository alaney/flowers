import { Arrangement } from "../../types/Types";

const patchArrangement = async (arrangement: Arrangement): Promise<Arrangement> => {
  arrangement.flowers = arrangement.flowers.filter((f) => f.name);
  const resp = await fetch("/api/arrangements", { method: "PATCH", body: JSON.stringify(arrangement) });
  const updatedArrangement: Arrangement = await resp.json();
  return updatedArrangement;
};

const postArrangement = async (arrangement: Arrangement): Promise<Arrangement> => {
  arrangement.flowers = arrangement.flowers.filter((f) => f.name);
  const resp = await fetch("/api/arrangements", { method: "POST", body: JSON.stringify(arrangement) });
  const updatedArrangement: Arrangement = await resp.json();
  return updatedArrangement;
};

export { patchArrangement, postArrangement };
