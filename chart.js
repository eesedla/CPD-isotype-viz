const SCALE = 5;
 
const PERSON_SVG = `<svg class="icon-person" viewBox="0 0 20 36" xmlns="http://www.w3.org/2000/svg">
  <circle cx="10" cy="5" r="4.5" fill="#D64d4d"/>
  <path d="M4 35 L4 16 Q4 10 10 10 Q16 10 16 16 L16 35 Z" fill="#D64d4d"/>
</svg>`;

function personFaded(opacity) {
  return `<svg class="icon-person" viewBox="0 0 20 36" xmlns="http://www.w3.org/2000/svg" style="opacity:${opacity}">
  <circle cx="10" cy="5" r="4.5" fill="#D64d4d"/>
  <path d="M4 35 L4 16 Q4 10 10 10 Q16 10 16 16 L16 35 Z" fill="#D64d4d"/>
</svg>`;
}
 
function buildChart(data) {
  const chart = document.getElementById('chart');
 
  data.forEach(function(row) {
    const fullIcons = Math.floor(row.officers / SCALE);
    const remainder = row.officers % SCALE;
    const partialOpacity = (remainder / SCALE).toFixed(2);
 
    const rowEl = document.createElement('div');
    rowEl.className = 'row';
 
    const labelEl = document.createElement('div');
    labelEl.className = 'row-label';
    labelEl.innerHTML =
      '<span class="charge-count">' + row.label + '</span>' +
      '<span class="officer-count">' + row.officers.toLocaleString() + ' officers</span>';
 
    const iconsEl = document.createElement('div');
    iconsEl.className = 'icons';
 
    var html = '';
    for (var i = 0; i < fullIcons; i++) {
      html += PERSON_SVG;
    }
    if (remainder > 0) {
      html += personFaded(partialOpacity);
    }
 
    iconsEl.innerHTML = html;
    rowEl.appendChild(labelEl);
    rowEl.appendChild(iconsEl);
    chart.appendChild(rowEl);
  });
}
 
fetch('data.json')
  .then(function(res) { return res.json(); })
  .then(function(data) { buildChart(data); });