// Get DOM Elements
const container = document.querySelector(
  ".card-container-bottom-stats-container"
);

// Get Data from data.json with IIFE (Immediately invoked function expressions)
(async function getData() {
  const response = await fetch("./data.json");
  const data = await response.json();

  // Create Bar Container for every data item
  data.forEach((item) => {
    const barContainerItems = document.createElement("div");
    barContainerItems.classList.add("bar-container-items");
    container.appendChild(barContainerItems);

    // Create Amount Container
    const amountContainer = document.createElement("div");
    const amountText = document.createElement("span");
    amountText.classList.add("bar-container-amounts-text");
    amountText.textContent = `$${item.amount}`;
    amountContainer.appendChild(amountText);
    barContainerItems.appendChild(amountContainer);

    // Create Bar Chart

    // Create Days
    const days = document.createElement("span");
    days.textContent = item.day;
    days.classList.add("bar-container-days");
    barContainerItems.appendChild(days);
  });
})();
