// Get DOM Elements
const container = document.querySelector(
  ".card-container-bottom-stats-container"
);

const barChartsArr = document.querySelectorAll(".bar-container-charts");
// const amountArr = document.querySelectorAll(".bar-container-amounts-container");

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

    // Show Amount Container on hover over bar charts
    charts.addEventListener("mouseenter", () => {
      amountContainer.style.visibility = "visible";
    });

    // Hide Amount Container on hover over bar charts
    charts.addEventListener("mouseleave", removeAmountOnMouseLeave);

    function removeAmountOnMouseLeave() {
      amountContainer.style.visibility = "hidden";
    }

    charts.addEventListener("click", (e) => {
      e.target.removeEventListener("mouseleave", removeAmountOnMouseLeave);
      charts.addEventListener("mouseleave", removeAmountOnMouseLeave);
    });
  });

  // Active State when button is clicked
  container.addEventListener("click", (e) => {
    if (!e.target.classList.contains("bar-container-charts")) return;
    const buttonArr = container.querySelectorAll("button");
    const amountContainer = container.querySelectorAll(
      ".bar-container-amounts-container"
    );

    buttonArr.forEach((button, index) => {
      if (e.target) {
        e.target.setAttribute("status", "active");
        e.target.style.backgroundColor = "#76B5BC";
        e.target
          .closest("div")
          .querySelector(".bar-container-amounts-container").style.visibility =
          "visible";
      }

      if (button !== e.target && button.getAttribute("status") === "active") {
        button.style.backgroundColor = "#EC755D";
        amountContainer[index].style.visibility = "hidden";
      }
    });
  });
})();
