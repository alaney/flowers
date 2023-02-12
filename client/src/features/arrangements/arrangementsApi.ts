import { Arrangement } from "../../types/Types";

export async function fetchArrangements(): Promise<Arrangement[]> {
  const resp = await fetch("/arrangements");
  const arrangements: Arrangement[] = await resp.json();
  return arrangements;
}
