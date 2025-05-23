
const form = document.getElementById('injectionForm');
const historyList = document.getElementById('historyList');
const nextSiteDisplay = document.getElementById('nextSite');

let history = JSON.parse(localStorage.getItem('injectionHistory')) || [];

const sites = [
  "Left Thigh", "Right Thigh",
  "Left Abdomen", "Right Abdomen",
  "Left Arm", "Right Arm"
];

function updateHistory() {
  historyList.innerHTML = '';
  history.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${entry.date} - ${entry.medication} - ${entry.site}`;
    historyList.appendChild(li);
  });

  const lastSiteIndex = sites.indexOf(history[history.length - 1]?.site);
  const nextSite = sites[(lastSiteIndex + 1) % sites.length];
  nextSiteDisplay.textContent = nextSite || 'N/A';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const medication = document.getElementById('medication').value;
  const site = document.getElementById('site').value;
  const date = new Date().toLocaleDateString();

  history.push({ medication, site, date });
  localStorage.setItem('injectionHistory', JSON.stringify(history));
  updateHistory();
});

updateHistory();
