import { Arrangement } from "../../types/Arrangement"

export async function fetchArrangements(): Promise<Arrangement[]> {
  const resp = await fetch("/arrangements")
  const arrangements: Arrangement[] = await resp.json()
  return arrangements
}
