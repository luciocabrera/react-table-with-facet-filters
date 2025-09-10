export interface SearchOptions<T> {
  /** Specific keys to search (defaults to all string fields on first item) */
  keys?: Array<keyof T>;
  /** All tokens must match (AND) or any (OR). Default AND */
  mode?: "AND" | "OR";
  /** If true, token must match from start of the field */
  matchFromStart?: boolean;
  /** Normalize accents (é -> e) before comparing */
  normalize?: boolean;
  /** Ignore empty tokens after splitting */
  trimEmpty?: boolean;
}

function normalizeValue(value: string, doNormalize: boolean) {
  const lower = value.toLowerCase();
  if (!doNormalize) return lower;
  return lower.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export function genericSearch<T extends Record<string, any>>(
  query: string,
  items: T[],
  options: SearchOptions<T> = {}
): T[] {
  if (!Array.isArray(items) || items.length === 0) return [];

  const {
    keys,
    mode = "AND",
    matchFromStart = false,
    normalize = true,
    trimEmpty = true,
  } = options;

  const q = query.trim();
  if (!q) return items;

  const tokens = q
    .split(/\s+/)
    .map((t) => normalizeValue(t, normalize))
    .filter((t) => (trimEmpty ? t.length > 0 : true));

  if (!tokens.length) return items;

  // Determine searchable keys
  const sample = items[0];
  const effectiveKeys: Array<keyof T> =
    keys && keys.length ?
      keys
    : (Object.keys(sample).filter(
        (k) => typeof (sample as any)[k] === "string"
      ) as Array<keyof T>);

  return items.filter((item) => {
    const fieldValues = effectiveKeys
      .map((k) =>
        typeof item[k] === "string" ?
          normalizeValue(String(item[k]), normalize)
        : ""
      )
      .filter(Boolean);
    if (!fieldValues.length) return false;

    const tokenMatches = tokens.map((tok) =>
      fieldValues.some((val) =>
        matchFromStart ? val.startsWith(tok) : val.includes(tok)
      )
    );

    return mode === "AND" ?
        tokenMatches.every(Boolean)
      : tokenMatches.some(Boolean);
  });
}

// Convenience wrapper matching original specific use-case (id, name, role)
export type SimpleItem = { id: number; name: string; role: string };
export function searchItems(query: string, items: SimpleItem[]) {
  return genericSearch(query, items, { keys: ["name", "role"], mode: "AND" });
}

// Example usage (remove or comment out in production):
const exampleData: SimpleItem[] = [
  { id: 1, name: "Alice Johnson", role: "Engineer" },
  { id: 2, name: "Bob Marley", role: "Support" },
  { id: 3, name: "Alicia Keys", role: "Engineer" },
];

// console.log(searchItems("ob mar", exampleData));
// console.log(searchItems("en", exampleData));
