import { Arrangement } from "../../types/Types";

export async function fetchArrangements(): Promise<Arrangement[]> {
  const resp = await fetch("/api/arrangements");
  if (resp.status === 200) {
    const arrangements: Arrangement[] = await resp.json();
    return arrangements;
  } else {
    throw new Error();
  }
}
