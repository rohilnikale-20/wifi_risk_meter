// script.js - simulated scan logic
const startBtn = document.getElementById('startBtn');
const needle = document.getElementById('needle');
const status = document.getElementById('status');
const resultsSection = document.getElementById('resultsSection');
const resultsBody = document.querySelector('#resultsTable tbody');

// Sample simulated networks (you can edit or extend)
const simulatedNetworks = [
  { ssid: "Home_Network", security: "WPA2", score: 25 },
  { ssid: "Cafe_FreeWifi", security: "Open", score: 90 },
  { ssid: "Station_Public", security: "Open", score: 95 },
  { ssid: "College_WiFi", security: "WPA2-Enterprise", score: 30 },
  { ssid: "Neighbor_OLD", security: "WEP", score: 80 },
  { ssid: "NewRouter_WPA3", security: "WPA3", score: 12 }
];

function riskLabel(score){
  if(score >= 75) return {l:"High Risk", cls:"risk-high"};
  if(score >= 40) return {l:"Moderate", cls:"risk-moderate"};
  return {l:"Safe", cls:"risk-safe"};
}

// simple needle animation helper (degrees: -90 -> +90)
function animateNeedle(toDeg, duration=800){
  needle.style.transition = `transform ${duration}ms cubic-bezier(.2,.9,.2,1)`;
  needle.style.transform = `rotate(${toDeg}deg)`;
}

function simulateScan(){
  status.textContent = "Scanning...";
  resultsSection.classList.add('hidden');
  resultsBody.innerHTML = "";
  startBtn.disabled = true;

  // fake progress: spin needle quickly
  animateNeedle(-40, 250);
  setTimeout(()=> animateNeedle(0, 400), 250);
  setTimeout(()=> animateNeedle(40, 500), 650);

  // after short delay show results (simulate milliseconds feel)
  setTimeout(()=>{
    status.textContent = "Results ready";
    startBtn.disabled = false;
    startBtn.textContent = "Scan Again";
    resultsSection.classList.remove('hidden');

    // Show results sorted by risk (high -> low)
    const sorted = simulatedNetworks.slice().sort((a,b)=> b.score - a.score);
    for(const n of sorted){
      const r = riskLabel(n.score);
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${n.ssid}</td><td>${n.security}</td><td class="${r.cls}">${r.l}</td><td>${n.score}</td>`;
      resultsBody.appendChild(tr);
    }

    // final needle position based on highest risk (just for visual)
    const top = sorted[0] ? sorted[0].score : 0;
    // map score 0..100 to deg -90..90: deg = -90 + (score/100)*180
    const deg = -90 + (top/100)*180;
    animateNeedle(deg, 800);

  }, 900); // 900ms to mimic quick scan
}

startBtn.addEventListener('click', ()=>{
  startBtn.textContent = "Scanning...";
  simulateScan();
});
