export async function loadGuests(date = new Date().toISOString().slice(0, 10)) {
  const response = await fetch("../guests/guests.json");
  const data = await response.json();
  const block = data.find((entry) => entry.date === date);
  return block ? block.guests : [];
}
