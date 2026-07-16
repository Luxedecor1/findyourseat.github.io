import { loadGuests } from "load_guests.js";

window.loadGuestsForDate = async function () {
  const date = document.getElementById("dateInput").value;
  const resultDiv = document.getElementById("adminResult");

  if (!date) {
    resultDiv.textContent = "Please choose a date.";
    return;
  }

  const guests = await loadGuests(date);

  if (guests.length === 0) {
    resultDiv.textContent = "No guests found for that date.";
    return;
  }

  resultDiv.innerHTML = `
    <p>Guests for ${date}:</p>
    <ul>
      ${guests.map((g) => `<li>${g.name} — table ${g.table}</li>`).join("")}
    </ul>
  `;
};
