import { Flower } from "../../types/Types"

export async function fetchArrangements(): Promise<Flower[]> {
  const resp = await fetch("/flowers")
  const flowers: Flower[] = await resp.json()
  return flowers
}
