// fetch the JSON file: alerts.json
export async function alerts() {
  const response = await fetch("/json/alerts.json");
  const data = await response.json();
  return data;
}

/* <section class="alert-list> element then loop through the results
and build a <p> for each alert
and apply the background and foreground colors to it specified in the alert */
export async function renderAlerts() {
  const alertsData = await alerts();

  // filter
  const filteredAlerts = alertsData.filter(alert => alert.message.includes("Success"));

  // searches for alert-list if not there, it creates that element
  let alertList = document.querySelector(".alert-list");
  if (!alertList) {
    alertList = document.createElement("section");
    alertList.classList.add("alert-list");

    // once section is created, it prepends to the main element on the index page
    const mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.prepend(alertList);
    }
  }

  // clear any previous alerts if needed
  alertList.innerHTML = "";

  // for each alert, it creates a p element and applies anything based on the JSON file
  filteredAlerts.forEach((alert) => {
    const alertParagraph = document.createElement("p");
    alertParagraph.textContent = alert.message;
    alertParagraph.style.backgroundColor = alert.background;
    alertParagraph.style.color = alert.color;
    alertList.appendChild(alertParagraph);
  });
}