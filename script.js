// Get UI elements
const startBtn = document.getElementById("startBtn");
const status = document.getElementById("status");
const resultsBody = document.querySelector("#resultsTable tbody");

// Simulated Wi-Fi networks (EDIT SSID HERE)
const simulatedNetworks = [
  { ssid: "Rohil_5G", security: "WPA2", score: 25 },
  { ssid: "Railwire_wifi", security: "Open", score: 90 },
  { ssid: "Adit_5G", security: "Open", score: 95 },
  { ssid: "Prithvi_cafe", security: "WPA2", score: 30 },
  { ssid: "Palak_Wifi", security: "WEP", score: 80 },
  { ssid: "TeddyLan", security: "WPA3", score: 12 }
];

// Risk label logic
function riskLabel(score) {
  if (score >= 75) return { label: "High Risk", cls: "risk-high" };
  if (score >= 40) return { label: "Moderate", cls: "risk-moderate" };
  return { label: "Safe", cls: "risk-safe" };
}

// Start scan
startBtn.addEventListener("click", () => {
  status.textContent = "Scanning Wi-Fi networks...";
  resultsBody.innerHTML = "";

  setTimeout(() => {
    simulatedNetworks.forEach(net => {
      const risk = riskLabel(net.score);
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${net.ssid}</td>
        <td>${net.security}</td>
        <td class="${risk.cls}">${risk.label}</td>
      `;

      resultsBody.appendChild(row);
    });

    status.textContent = "Scan complete.";
  }, 1200);
});
