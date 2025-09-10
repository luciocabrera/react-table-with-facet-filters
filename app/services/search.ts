type Item = { id: number; name: string; role: string };

function searchItems(query: string, items: Item[]): Item[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;

  const tokens = q.split(/\s+/).filter(Boolean);
  if (!tokens.length) return items;

  return items.filter((item) => {
    // Collect lowercase searchable fields
    const fields = [item.name.toLowerCase(), item.role.toLowerCase()];

    // Every token must appear in at least one field
    return tokens.every((tok) => fields.some((f) => f.includes(tok)));
  });
}

// Example usage:
const data = [
  { id: 1, name: "Alice Johnson", role: "Engineer" },
  { id: 2, name: "Bob Marley", role: "Support" },
  { id: 3, name: "Alicia Keys", role: "Engineer" },
];

console.log(searchItems("ob mar", data));
// -> [ { id: 2, name: 'Bob Marley', role: 'Support' } ]

console.log(searchItems("en", data));
// -> [
//      { id: 1, name: 'Alice Johnson', role: 'Engineer' },
//      { id: 3, name: 'Alicia Keys', role: 'Engineer' }
//    ]
