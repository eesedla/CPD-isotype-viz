function buildChart(data) {
  const chart = document.getElementById('chart');
  const max = Math.max(...data.map(d => d.officers));

  data.forEach(function(row) {
    const pct = (row.officers / max * 100).toFixed(2);

    const rowEl = document.createElement('div');
    rowEl.className = 'row';

    rowEl.innerHTML =
      '<div class="row-label">' +
        '<span class="charge-count">' + row.label + '</span>' +
      '</div>' +
      '<div class="bar-wrap">' +
        '<div class="bar-track">' +
          '<div class="bar" style="width:' + pct + '%"></div>' +
        '</div>' +
        '<span class="bar-value">' + row.officers.toLocaleString() + '</span>' +
      '</div>';

    chart.appendChild(rowEl);
  });
}

fetch('data.json')
  .then(function(res) { return res.json(); })
  .then(function(data) { buildChart(data); });
