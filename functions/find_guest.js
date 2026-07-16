import { loadGuests } from "./load_guests.js";

let guests = [];

async function init() {
  guests = await loadGuests();
}

init();

function normalize(text) {
  return text.toLowerCase().trim().replace(/\s+/g, " ");
}

window.findGuest = function () {
  const input = normalize(document.getElementById("nameInput").value);
  const resultDiv = document.getElementById("result");

  if (!input) {
    resultDiv.innerHTML = "Please enter your name.";
    return;
  }

  const guest = guests.find((g) => normalize(g.name) === input);

  if (guest) {
    resultDiv.innerHTML = `Welcome ${guest.name}!<br>You are seated at <strong>Table ${guest.table}</strong>.`;
  } else {
    resultDiv.innerHTML =
      "We could not find your name. Please ask the host for help.";
  }
};
