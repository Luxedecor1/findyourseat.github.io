const guestsUrl = new URL("../guests/guests.json", import.meta.url);

export async function loadGuests(date = new Date().toISOString().slice(0, 10)) {
  const response = await fetch(guestsUrl);
  const data = await response.json();
  const block = data.find((entry) => entry.date === date);
  return block ? block.guests : [];
}

export async function loadEvents() {
  const response = await fetch(guestsUrl);
  return await response.json();
}
