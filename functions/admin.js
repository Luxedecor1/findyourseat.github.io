import { loadGuests, loadEvents } from "./load_guests.js";

const select = document.getElementById("eventSelect");

async function init() {
  const events = await loadEvents();

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Select an event";
  placeholder.disabled = true;
  placeholder.selected = true;
  placeholder.hidden = true;

  select.appendChild(placeholder);

  events.forEach((event) => {
    const option = document.createElement("option");
    option.value = event.date;
    const prettyDate = new Date(event.date).toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    option.textContent = prettyDate;
    select.appendChild(option);
  });
}

init();

const resultDiv = document.getElementById("adminResult");

select.addEventListener("change", async () => {
  const guests = await loadGuests(select.value);

  const tables = {};

  guests.forEach((guest) => {
    if (!tables[guest.table]) {
      tables[guest.table] = [];
    }

    tables[guest.table].push(guest);
  });
  const numberOfTables = Object.keys(tables).length;

  const summary = `
  <div class="summary">
    <strong>${guests.length}</strong> guests
    &nbsp;•&nbsp;
    <strong>${numberOfTables}</strong> tables
  </div>
`;

  const html = Object.keys(tables)
    .sort((a, b) => Number(a) - Number(b))
    .map(
      (table) => `
    <div class="table-card">
      <h2>Table ${table} <span class="guest-count">(${tables[table].length})</span></h2>

      <ul>
        ${tables[table].map((g) => `<li>${g.name}</li>`).join("")}
      </ul>
    </div>
  `,
    )
    .join("");

  resultDiv.innerHTML = `
    ${summary}
    <div class="tables-grid">
      ${html}
    </div>
  `;
});
