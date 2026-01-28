const startBtn = document.getElementById("startBtn");
const status = document.getElementById("status");
const resultsSection = document.getElementById("resultsSection");
const resultsBody = document.querySelector("#resultsTable tbody");

// YOUR networks (unchanged names)
const simulatedNetworks = [
  { ssid: "Rohil_5G", security: "WPA2", score: 25 },
  { ssid: "Railwire_wifi", security: "Open", score: 90 },
  { ssid: "Adit_5G", security: "Open", score: 95 },
  { ssid: "Prithvi_cafe", security: "WPA2", score: 30 },
  { ssid: "Palak_wifi", security: "WEP", score: 80 },
  { ssid: "TeddyLan", security: "WPA3", score: 12 }
];

function riskLabel(score) {
  if (score >= 75) return "High Risk";
  if (score >= 40) return "Moderate";
  return "Safe";
}

startBtn.addEventListener("click", () => {
  status.innerText = "Scanning Wi-Fi networks...";
  resultsBody.innerHTML = "";
  resultsSection.style.display = "none";

  setTimeout(() => {
    simulatedNetworks.forEach(network => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${network.ssid}</td>
        <td>${network.security}</td>
        <td>${riskLabel(network.score)}</td>
      `;

      resultsBody.appendChild(row);
    });

    resultsSection.style.display = "block";
    status.innerText = "Scan Complete";
  }, 1200);
});
