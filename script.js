// === SEIR Model ===

const PRESETS = {
  bacterial: { beta: 0.45, sigma: 3.5, gamma: 7, hosp: 12, cfr: 1.2, contacts: 8, immune: 5, label: 'Pneumonia Bacteriana (CAP)' },
  viral:     { beta: 0.60, sigma: 2.0, gamma: 5, hosp: 8,  cfr: 0.6, contacts: 12, immune: 10, label: 'Pneumonia Viral (Influenza)' }
};

let currentType = 'bacterial';
let seirChart = null;
let hospChart = null;

function setType(type) {
  currentType = type;
  const p = PRESETS[type];
  document.getElementById('s-beta').value    = p.beta;
  document.getElementById('s-sigma').value   = p.sigma;
  document.getElementById('s-gamma').value   = p.gamma;
  document.getElementById('s-hosp').value    = p.hosp;
  document.getElementById('s-cfr').value     = p.cfr;
  document.getElementById('s-contacts').value = p.contacts;
  document.getElementById('s-immune').value  = p.immune;
  document.querySelectorAll('.type-tab').forEach((t,i) => t.classList.toggle('active', (i===0 && type==='bacterial')||(i===1 && type==='viral')));
  document.getElementById('info-type').innerHTML = `<strong>${p.label}</strong>`;
  update();
}

function getP() {
  const g = id => parseFloat(document.getElementById(id).value);
  const gc = id => document.getElementById(id).checked;
  return {
    beta:      g('s-beta'),
    sigma:     g('s-sigma'),
    gamma:     g('s-gamma'),
    contacts:  g('s-contacts'),
    hosp:      g('s-hosp') / 100,
    cfr:       g('s-cfr') / 100,
    N:         g('s-pop'),
    I0:        g('s-i0'),
    immune:    g('s-immune') / 100,
    days:      Math.round(g('s-days')),
    intDay:    Math.round(g('s-intday')),
    distOn:    gc('cb-distancing'),
    distPct:   g('s-dist') / 100,
    abOn:      gc('cb-antibiotics'),
    abPct:     g('s-ab') / 100,
    vaxOn:     gc('cb-vaccine'),
    vaxPct:    g('s-vax') / 100,
  };
}

function runSEIR(p) {
  const N = p.N;
  const immuneN = Math.round(p.immune * N);
  let S = N - p.I0 - immuneN;
  let E = 0;
  let I = p.I0;
  let R = immuneN;
  const sigma = 1 / p.sigma;

  const results = { S:[], E:[], I:[], R:[], newI:[], cumI:[], hospDaily:[], deathsDaily:[], cumDeaths:[] };
  let cumInfected = p.I0;
  let cumDeaths = 0;

  for (let d = 0; d <= p.days; d++) {
    let beta = p.beta;
    let contacts = p.contacts;
    let gamma = 1 / p.gamma;

    if (d >= p.intDay) {
      if (p.distOn)  contacts *= (1 - p.distPct);
      if (p.abOn)    gamma    /= (1 - p.abPct);   // shorter infectious period
      if (p.vaxOn) { S = Math.max(0, S - S * (p.vaxPct * 0.004)); } // gradual vaccination
    }

    const forceInfection = beta * contacts * (I / N);
    const newExposed  = Math.min(S, S * forceInfection);
    const newInfected = E * sigma;
    const newRecov    = I * gamma;
    const newHosp     = newInfected * p.hosp;
    const newDeaths   = newInfected * p.cfr;

    S -= newExposed;
    E += newExposed - newInfected;
    I += newInfected - newRecov;
    R += newRecov;

    I = Math.max(0, I); E = Math.max(0, E); S = Math.max(0, S);

    cumInfected += newInfected;
    cumDeaths += newDeaths;

    results.S.push(S); results.E.push(E); results.I.push(I); results.R.push(R);
    results.newI.push(newInfected);
    results.hospDaily.push(newHosp);
    results.deathsDaily.push(newDeaths);
    results.cumDeaths.push(cumDeaths);
    results.cumI.push(cumInfected);
  }
  return results;
}

function fmtNum(n) {
  if (n >= 1e6) return (n/1e6).toFixed(2) + 'M';
  if (n >= 1e3) return (n/1e3).toFixed(1) + 'k';
  return Math.round(n).toString();
}

function update() {
  const p = getP();

  // Update slider displays
  document.getElementById('val-beta').textContent    = p.beta.toFixed(2);
  document.getElementById('val-sigma').textContent   = p.sigma.toFixed(1) + ' dias';
  document.getElementById('val-gamma').textContent   = p.gamma.toFixed(1) + ' dias';
  document.getElementById('val-contacts').textContent = Math.round(p.contacts);
  document.getElementById('val-hosp').textContent    = Math.round(p.hosp*100) + '%';
  document.getElementById('val-cfr').textContent     = (p.cfr*100).toFixed(1) + '%';
  document.getElementById('val-pop').textContent     = Math.round(p.N).toLocaleString('pt-BR');
  document.getElementById('val-i0').textContent      = Math.round(p.I0);
  document.getElementById('val-immune').textContent  = Math.round(p.immune*100) + '%';
  document.getElementById('val-days').textContent    = Math.round(p.days);
  document.getElementById('val-intday').textContent  = Math.round(p.intDay);
  document.getElementById('val-dist').textContent    = document.getElementById('s-dist').value + '%';
  document.getElementById('val-ab').textContent      = document.getElementById('s-ab').value + '%';
  document.getElementById('val-vax').textContent     = document.getElementById('s-vax').value + '%';

  // Toggle intervention panels
  document.getElementById('row-distancing').style.display = p.distOn ? 'block' : 'none';
  document.getElementById('row-antibiotics').style.display = p.abOn ? 'block' : 'none';
  document.getElementById('row-vaccine').style.display = p.vaxOn ? 'block' : 'none';

  // R0
  const R0 = p.beta * p.contacts * p.gamma * (1 - p.immune);
  document.getElementById('r0-val').textContent = R0.toFixed(2);
  const r0Color = R0 > 2 ? 'var(--red)' : R0 > 1 ? 'var(--accent4)' : 'var(--accent3)';
  document.getElementById('r0-val').style.color = r0Color;
  document.getElementById('r0-bar').style.width = Math.min(100, (R0/8)*100) + '%';
  document.getElementById('r0-bar').style.background = r0Color;
  document.getElementById('r0-status').style.color = r0Color;
  document.getElementById('r0-status').textContent = R0 > 1
    ? `⚠ Epidemia em expansão (R₀ > 1)`
    : `✓ Epidemia controlada (R₀ < 1)`;

  // Run model
  const res = runSEIR(p);
  const days = Array.from({length: p.days+1}, (_,i) => i);

  // Stats
  const peakI = Math.max(...res.I);
  const peakDay = res.I.indexOf(peakI);
  const totalCases = res.cumI[res.cumI.length-1];
  const peakHosp = Math.max(...res.hospDaily);
  const totalDeaths = res.cumDeaths[res.cumDeaths.length-1];

  document.getElementById('stat-peak').textContent = fmtNum(peakI);
  document.getElementById('stat-peak-day').textContent = `dia ${peakDay}`;
  document.getElementById('stat-total').textContent = fmtNum(totalCases);
  document.getElementById('stat-hosp').textContent = fmtNum(Math.max(...res.hospDaily) * 14); // hospitalized at peak (14d stay)
  document.getElementById('stat-hosp-peak').textContent = `pico dia ${res.hospDaily.indexOf(peakHosp)}`;
  document.getElementById('stat-deaths').textContent = fmtNum(totalDeaths);
  document.getElementById('stat-cfr-show').textContent = `CFR ${(p.cfr*100).toFixed(1)}%`;

  // Colors
  const colors = {
    S: '#5c9eed', E: '#d4a843', I: '#e05c5c', R: '#61c78b',
    hosp: '#e06c3a', deaths: '#a855f7'
  };

  // SEIR Chart
  const seirData = {
    labels: days,
    datasets: [
      { label: 'Suscetíveis (S)', data: res.S, borderColor: colors.S, backgroundColor: colors.S+'22', fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2 },
      { label: 'Expostos (E)',    data: res.E, borderColor: colors.E, backgroundColor: colors.E+'22', fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2 },
      { label: 'Infectados (I)', data: res.I, borderColor: colors.I, backgroundColor: colors.I+'22', fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2 },
      { label: 'Recuperados (R)',data: res.R, borderColor: colors.R, backgroundColor: colors.R+'11', fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2 },
    ]
  };

  const chartOpts = (yLabel) => ({
    responsive: true, maintainAspectRatio: false,
    animation: { duration: 200 },
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: '#484f58', font: { size: 10 }, maxTicksLimit: 12 }, grid: { color: '#1c2433' }, title: { display: true, text: 'Dias', color: '#8b949e', font: { size: 11 } } },
      y: { ticks: { color: '#484f58', font: { size: 10 }, callback: v => fmtNum(v) }, grid: { color: '#1c2433' }, title: { display: true, text: yLabel, color: '#8b949e', font: { size: 11 } } }
    }
  });

  if (seirChart) seirChart.destroy();
  seirChart = new Chart(document.getElementById('chart-seir'), { type:'line', data: seirData, options: chartOpts('Indivíduos') });

  // SEIR Legend
  const leg = document.getElementById('legend-seir');
  leg.innerHTML = seirData.datasets.map(d =>
    `<div class="legend-item"><div class="legend-dot" style="background:${d.borderColor}"></div><span class="legend-label">${d.label}</span></div>`
  ).join('');

  // Hosp + Deaths chart
  // Compute cumulative hosp
  const cumHosp = [];
  let ch = 0;
  for (let i = 0; i < res.hospDaily.length; i++) { ch += res.hospDaily[i]*14; cumHosp.push(ch); }

  const hospData = {
    labels: days,
    datasets: [
      { label: 'Hospitalizações acumuladas', data: cumHosp, borderColor: colors.hosp, backgroundColor: colors.hosp+'22', fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2, yAxisID: 'y' },
      { label: 'Óbitos acumulados', data: res.cumDeaths, borderColor: colors.deaths, backgroundColor: colors.deaths+'22', fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2, yAxisID: 'y2' },
    ]
  };

  if (hospChart) hospChart.destroy();
  hospChart = new Chart(document.getElementById('chart-hosp'), {
    type: 'line',
    data: hospData,
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 200 },
      plugins: { legend: { display: true, labels: { color: '#8b949e', font: { size: 10, family: 'IBM Plex Mono' }, boxWidth: 10 } } },
      scales: {
        x: { ticks: { color: '#484f58', font: { size: 10 }, maxTicksLimit: 12 }, grid: { color: '#1c2433' } },
        y: { position: 'left', ticks: { color: colors.hosp, font: { size: 10 }, callback: v => fmtNum(v) }, grid: { color: '#1c2433' } },
        y2: { position: 'right', ticks: { color: colors.deaths, font: { size: 10 }, callback: v => fmtNum(v) }, grid: { display: false } }
      }
    }
  });
}

// Init
update();
