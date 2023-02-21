import { Arrangement } from "../../types/Types";

const patchArrangement = async (arrangement: Arrangement): Promise<Arrangement> => {
  const resp = await fetch("/api/arrangements", { method: "PATCH", body: JSON.stringify(arrangement) });
  const updatedArrangement: Arrangement = await resp.json();
  return updatedArrangement;
};

export { patchArrangement };
