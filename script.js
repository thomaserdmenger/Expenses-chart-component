// Get DOM Elements
const container = document.querySelector(
  ".card-container-bottom-stats-container"
);

// Get Data from data.json with IIFE (Immediately invoked function expressions)
(async function getData() {
  const response = await fetch("./data.json");
  const data = await response.json();

  // Create Bar Container for every data item
  data.forEach((item, index) => {
    const barContainerItems = document.createElement("div");
    barContainerItems.classList.add("bar-container-items");
    container.appendChild(barContainerItems);

    // Create Amount Container
    const amountContainer = document.createElement("div");
    amountContainer.classList.add("bar-container-amounts-container");
    const amountText = document.createElement("span");
    amountText.classList.add("bar-container-amounts-text");
    amountText.textContent = `$${item.amount}`;
    amountContainer.appendChild(amountText);
    barContainerItems.appendChild(amountContainer);

    // Create Bar Chart
    const charts = document.createElement("button");
    charts.setAttribute("type", "button");
    charts.setAttribute("status", "");
    charts.classList.add("bar-container-charts");
    charts.classList.add(`bar-container-charts-index-${index}`);
    barContainerItems.appendChild(charts);

    // Create Days
    const days = document.createElement("span");
    days.textContent = item.day;
    days.classList.add("bar-container-days");
    barContainerItems.appendChild(days);
  });

  // Get DOM Elements
  const chartContainerArr = container.querySelectorAll(".bar-container-items");
  const amountArr = container.querySelectorAll(
    ".bar-container-amounts-container"
  );
  const chartArr = container.querySelectorAll(".bar-container-charts");

  // Add Hover Effect
  chartArr.forEach((item) => {
    item.addEventListener("mouseenter", addAmountOnMouseEnter);
  });

  function addAmountOnMouseEnter(e) {
    e.target
      .closest(".bar-container-items")
      .querySelector(".bar-container-amounts-container").style.visibility =
      "visible";
  }

  // Remove Hover Amount Effekt normal
  chartArr.forEach((item) => {
    item.addEventListener("mouseleave", removeAmountOnMouseLeave);
  });

  function removeAmountOnMouseLeave(e) {
    e.target
      .closest(".bar-container-items")
      .querySelector(".bar-container-amounts-container").style.visibility =
      "hidden";
  }

  // Show Amount on Click
  chartArr.forEach((item) => {
    item.addEventListener("click", (e) => {
      chartArr.forEach((items) => {
        items.setAttribute("status", "");

        items
          .closest(".bar-container-items")
          .querySelector(".bar-container-amounts-container").style.visibility =
          "hidden";

        items.style.backgroundColor = "#EC755D";

        items.addEventListener("mouseleave", removeAmountOnMouseLeave);
      });

      e.target
        .closest(".bar-container-items")
        .querySelector(".bar-container-amounts-container").style.visibility =
        "visible";

      e.target.setAttribute("status", "active");

      e.target.style.backgroundColor = "#76B5BC";

      removeEventListener(e);
    });
  });

  function removeEventListener(e) {
    e.target.removeEventListener("mouseleave", removeAmountOnMouseLeave);
  }
})();
