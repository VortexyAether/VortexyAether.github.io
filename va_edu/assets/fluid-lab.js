const $ = id => document.getElementById(id);
const g = 9.81;
const rhoWater = 1000;
const muWater = 1.005e-3;

function fmt(n, d = 2) {
  return Number(n).toLocaleString(undefined, { maximumFractionDigits: d });
}

function arrow(ctx, x1, y1, x2, y2, c = "#64d8ff", width = 2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 3) return;
  const head = Math.min(9, len * 0.34);
  ctx.save();
  ctx.strokeStyle = c;
  ctx.fillStyle = c;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  const a = Math.atan2(dy, dx);
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - head * Math.cos(a - 0.55), y2 - head * Math.sin(a - 0.55));
  ctx.lineTo(x2 - head * Math.cos(a + 0.55), y2 - head * Math.sin(a + 0.55));
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function clear(ctx, w, h) {
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#07111f";
  ctx.fillRect(0, 0, w, h);
  ctx.font = "14px ui-sans-serif, system-ui";
}

function drawHydro() {
  const h = +$("depth").value;
  const rho = +$("rho").value;
  const scale = +$("manometerScale").value;
  const p = rho * g * h;
  $("depthOut").textContent = h.toFixed(1);
  $("rhoOut").textContent = rho.toFixed(0);
  $("manometerOut").textContent = scale.toFixed(1);
  $("pGauge").textContent = `${fmt(p / 1000, 1)} kPa`;
  $("pAbs").textContent = `${fmt((101325 + p) / 1000, 1)} kPa`;
  $("headOut").textContent = `${fmt(p / (rho * g), 2)} m`;

  const c = $("hydroCanvas");
  const ctx = c.getContext("2d");
  const W = c.width;
  const H = c.height;
  clear(ctx, W, H);

  ctx.fillStyle = "#0ea5e966";
  ctx.fillRect(70, 55, 210, 250);
  ctx.strokeStyle = "#9bdcff";
  ctx.lineWidth = 3;
  ctx.strokeRect(70, 55, 210, 250);
  ctx.fillStyle = "#eaf2ff";
  ctx.fillText("free surface p0", 82, 43);

  const y = 55 + h / 10 * 250;
  ctx.strokeStyle = "#fbbf24";
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.moveTo(70, y);
  ctx.lineTo(280, y);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "#fbbf24";
  ctx.fillText(`h = ${h.toFixed(1)} m`, 292, y + 4);

  ctx.globalAlpha = 0.35;
  for (let i = 0; i < 6; i++) {
    const yy = 82 + i * 38;
    const depthFrac = Math.max(0, Math.min(1, (yy - 55) / 250));
    const len = 14 + depthFrac * 52;
    arrow(ctx, 70, yy, 70 - len, yy, "#a7f3d0");
    arrow(ctx, 280, yy, 280 + len, yy, "#a7f3d0");
  }
  ctx.globalAlpha = 1;
  const currentLen = 18 + h / 10 * 112;
  arrow(ctx, 280, y, Math.min(455, 280 + currentLen), y, "#fbbf24", 4);
  ctx.fillStyle = "#fbbf24";
  ctx.fillText("selected-depth pressure", 292, Math.max(72, y - 16));

  const tubeX = 395;
  const tubeBottom = 292;
  const tubeTop = Math.max(72, tubeBottom - h * 22 * scale);
  ctx.strokeStyle = "#dbeafe";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(tubeX, tubeBottom);
  ctx.lineTo(tubeX, tubeTop);
  ctx.stroke();
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(280, y);
  ctx.lineTo(tubeX, y);
  ctx.lineTo(tubeX, tubeTop);
  ctx.stroke();
  ctx.fillStyle = "#d9f99d";
  ctx.fillText("piezometer head", tubeX - 58, Math.max(60, tubeTop - 14));
  ctx.fillStyle = "#a9b8cc";
  ctx.fillText("pressure arrows grow linearly with depth", 82, 334);
}

function drawVisc() {
  const U = +$("uPlate").value;
  const Hmm = +$("gap").value;
  const mu = +$("mu").value / 1000;
  const mode = $("viscMode").value;
  const Hm = Hmm / 1000;
  const tau = mode === "couette" ? mu * U / Hm : 4 * mu * U / Hm;
  $("uOut").textContent = U.toFixed(1);
  $("hOut").textContent = Hmm.toFixed(0);
  $("muOut").textContent = $("mu").valueAsNumber.toFixed(1);
  $("tau").textContent = `${fmt(tau, 3)} Pa`;

  const c = $("viscCanvas");
  const ctx = c.getContext("2d");
  const W = c.width;
  const H = c.height;
  clear(ctx, W, H);

  ctx.fillStyle = "#94a3b8";
  ctx.fillRect(75, 70, 310, 16);
  ctx.fillRect(75, 280, 310, 16);
  ctx.fillStyle = "#0ea5e955";
  ctx.fillRect(75, 86, 310, 194);
  ctx.fillStyle = "#eaf2ff";
  ctx.fillText(mode === "couette" ? "moving plate U" : "fixed wall: no slip", 90, 58);
  if (mode === "couette") arrow(ctx, 230, 58, 330, 58, "#fbbf24");

  const profile = [];
  for (let i = 0; i < 7; i++) {
    const f = i / 6;
    const y = 270 - f * 170;
    const speed = mode === "couette" ? f * U : 4 * U * f * (1 - f);
    const len = 18 + speed / Math.max(U, 0.2) * 132;
    arrow(ctx, 100, y, 100 + len, y, "#64d8ff");
    profile.push([110 + speed / Math.max(U, 0.2) * 132, y]);
    ctx.fillStyle = "#a9b8cc";
    ctx.fillText(`${speed.toFixed(1)} m/s`, 270, y + 4);
  }
  ctx.strokeStyle = "#d9f99d";
  ctx.lineWidth = 3;
  ctx.beginPath();
  profile.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
  ctx.stroke();
  ctx.fillStyle = "#d9f99d";
  ctx.fillText(mode === "couette" ? "linear Couette profile" : "parabolic Poiseuille profile", 172, 126);
}

function drawJump() {
  const y1 = +$("y1").value;
  const V1 = +$("v1").value;
  const Fr = V1 / Math.sqrt(g * y1);
  const jumpValid = Fr > 1;
  const ratio = jumpValid ? 0.5 * (Math.sqrt(1 + 8 * Fr * Fr) - 1) : 1;
  const y2 = y1 * ratio;
  const loss = jumpValid ? Math.pow(y2 - y1, 3) / (4 * y1 * y2) : 0;
  $("y1Out").textContent = y1.toFixed(2);
  $("v1Out").textContent = V1.toFixed(1);
  $("fr1").textContent = Fr.toFixed(2);
  $("y2").textContent = jumpValid ? `${y2.toFixed(2)} m` : "—";
  $("loss").textContent = jumpValid ? `${loss.toFixed(2)} m` : "—";

  const c = $("jumpCanvas");
  const ctx = c.getContext("2d");
  const W = c.width;
  const H = c.height;
  clear(ctx, W, H);
  ctx.strokeStyle = "#94a3b8";
  ctx.beginPath();
  ctx.moveTo(30, 285);
  ctx.lineTo(490, 285);
  ctx.stroke();
  const sy = 160 / Math.max(y2, 0.35);
  const y1p = y1 * sy;
  const y2p = y2 * sy;
  ctx.fillStyle = "#0ea5e977";
  ctx.beginPath();
  ctx.moveTo(35, 285);
  ctx.lineTo(35, 285 - y1p);
  ctx.bezierCurveTo(180, 285 - y1p, 210, 285 - y2p - 25, 250, 285 - y2p);
  ctx.lineTo(485, 285 - y2p);
  ctx.lineTo(485, 285);
  ctx.closePath();
  ctx.fill();
  const upstreamArrow = Math.min(82, 22 + V1 * 6);
  const downstreamArrow = Math.min(70, Math.max(18, V1 / Math.max(ratio, 1) * 14));
  for (let i = 0; i < 5; i++) arrow(ctx, 55 + i * 30, 270 - y1p / 2, 55 + i * 30 + upstreamArrow, 270 - y1p / 2, "#fbbf24");
  for (let i = 0; i < 5; i++) arrow(ctx, 306 + i * 30, 270 - y2p / 2, 306 + i * 30 + downstreamArrow, 270 - y2p / 2, "#a7f3d0");
  ctx.fillStyle = "#eaf2ff";
  ctx.fillText("supercritical: shallow + fast", 45, 45);
  ctx.fillText("subcritical: deep + slow", 305, 45);
  ctx.fillStyle = Fr > 1 ? "#fbbf24" : "#a7f3d0";
  ctx.fillText(jumpValid ? "Jump possible (Fr1 > 1)" : "No classical jump (Fr1 <= 1)", 200, 325);
}

function swameeJainTurbulent(Re, roughness) {
  return 0.25 / Math.pow(Math.log10(roughness / 3.7 + 5.74 / Math.pow(Re, 0.9)), 2);
}

function pipeFrictionFactor(Re, roughness) {
  if (Re < 2300) return 64 / Math.max(Re, 1);
  if (Re > 4000) return swameeJainTurbulent(Re, roughness);
  const t = (Re - 2300) / 1700;
  const fLam2300 = 64 / 2300;
  const fTurb4000 = swameeJainTurbulent(4000, roughness);
  return fLam2300 * (1 - t) + fTurb4000 * t;
}

function drawPipe() {
  const D = +$("diam").value / 1000;
  const V = +$("pipeV").value;
  const L = +$("pipeL").value;
  const rough = +$("roughness").value;
  const Re = rhoWater * V * D / muWater;
  const f = pipeFrictionFactor(Re, rough);
  const dp = f * (L / D) * rhoWater * V * V / 2;
  $("dOut").textContent = (D * 1000).toFixed(0);
  $("pipeVOut").textContent = V.toFixed(2);
  $("lOut").textContent = L.toFixed(1);
  $("roughOut").textContent = rough.toFixed(4);
  $("rePipe").textContent = fmt(Re, 0);
  $("regime").textContent = Re < 2300 ? "층류" : Re < 4000 ? "천이영역" : "난류 가능";
  $("dpPipe").textContent = `${fmt(dp / 1000, 2)} kPa`;

  const c = $("pipeCanvas");
  const ctx = c.getContext("2d");
  const W = c.width;
  const H = c.height;
  clear(ctx, W, H);
  ctx.fillStyle = "#1e3a5f";
  ctx.fillRect(45, 95, 430, 130);
  ctx.fillStyle = "#0ea5e966";
  ctx.fillRect(45, 115, 430, 90);
  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 5;
  ctx.strokeRect(45, 95, 430, 130);
  for (let i = 0; i < 9; i++) {
    const x = 68 + i * 45;
    const yy = 132 + (i % 3) * 28;
    const wallFrac = Math.abs(yy - 160) / 45;
    const laminarShape = Math.max(0.15, 1 - wallFrac * wallFrac);
    const turbWiggle = 0.75 + 0.25 * Math.sin(i * 1.7);
    const speedScale = Math.min(1, V / 4.5);
    const len = Re < 2300 ? 22 + laminarShape * 86 * speedScale : 34 + turbWiggle * 70 * speedScale;
    arrow(ctx, x, yy, Math.min(462, x + len), yy, "#64d8ff");
  }
  ctx.fillStyle = "#eaf2ff";
  ctx.fillText(Re < 2300 ? "parabolic laminar profile" : "turbulent core + rough wall friction", 125, 55);
}

function drawExt() {
  const V = +$("extV").value;
  const A = +$("area").value;
  const Cd = +$("shape").value;
  const L = +$("extL").value;
  const F = 0.5 * 1.225 * V * V * Cd * A;
  const Re = 1.225 * V * L / 1.81e-5;
  $("extVOut").textContent = V.toFixed(0);
  $("areaOut").textContent = A.toFixed(3);
  $("extLOut").textContent = L.toFixed(2);
  $("drag").textContent = `${fmt(F, 2)} N`;
  $("reExt").textContent = Re > 999999 ? `${fmt(Re / 1e6, 2)}M` : `${fmt(Re / 1000, 0)}k`;

  const c = $("extCanvas");
  const ctx = c.getContext("2d");
  const W = c.width;
  const H = c.height;
  clear(ctx, W, H);
  for (let y = 55; y < 270; y += 30) {
    ctx.strokeStyle = "#1fb6ff88";
    ctx.beginPath();
    ctx.moveTo(25, y);
    ctx.bezierCurveTo(170, y, 220, y - 25, 310, y);
    ctx.bezierCurveTo(380, y + 20, 430, y, 500, y);
    ctx.stroke();
  }
  ctx.fillStyle = "#dbeafe";
  ctx.beginPath();
  if (Cd < 0.1) ctx.ellipse(255, 160, 95, 28, 0, 0, Math.PI * 2);
  else if (Cd < 0.6) ctx.arc(255, 160, 48, 0, Math.PI * 2);
  else ctx.rect(215, 112, 85, 95);
  ctx.fill();
  const wake = Cd < 0.1 ? 48 : Cd < 0.6 ? 82 : 135;
  ctx.fillStyle = "#fbbf2433";
  ctx.beginPath();
  ctx.ellipse(335 + wake / 3, 160, wake, 38, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fbbf24";
  ctx.fillText("wake / possible separation", 330, 210);
  arrow(ctx, 300, 160, 390, 160, "#fbbf24");
}

function machineryEstimate({ chord, pitchDeg, radius, rpm, flowSpeed, bladeCount }) {
  const rhoAir = 1.225;
  const omega = rpm * Math.PI * 2 / 60;
  const r75 = 0.75 * radius;
  const spanEffective = 0.7 * radius;
  const diskArea = Math.PI * radius * radius;
  const bladeArea = bladeCount * chord * spanEffective;
  const solidity = bladeCount * chord / (2 * Math.PI * r75);
  const tipSpeed = omega * radius;
  const tangentialSpeed = omega * r75;
  const inducedGuess = 0.06 * tipSpeed;
  const axialSpeed = Math.max(flowSpeed, inducedGuess);
  const localSpeed = Math.hypot(axialSpeed, tangentialSpeed);
  const phi = Math.atan2(axialSpeed, Math.max(tangentialSpeed, 0.1));
  const alpha = pitchDeg * Math.PI / 180 - phi;
  const alphaDeg = alpha * 180 / Math.PI;
  const clLinear = 2 * Math.PI * alpha;
  const cl = Math.max(-0.7, Math.min(1.15, clLinear));
  const cd = 0.018 + 0.055 * cl * cl + 0.02 * solidity;
  const q = 0.5 * rhoAir * localSpeed * localSpeed;
  const lift = q * bladeArea * cl;
  const drag = q * bladeArea * cd;
  const thrustRaw = lift * Math.cos(phi) - drag * Math.sin(phi);
  const tangentialRaw = lift * Math.sin(phi) + drag * Math.cos(phi);
  const thrust = Math.max(0, thrustRaw);
  const tangential = Math.max(0, tangentialRaw);
  const torque = tangential * r75;
  const power = torque * omega;
  const usefulPower = thrust * flowSpeed;
  const etaRaw = power > 0 && flowSpeed > 0 ? usefulPower / power : 0;
  const eta = Math.max(0, Math.min(0.95, etaRaw));
  const n = rpm / 60;
  const advanceRatio = n > 0 && radius > 0 ? flowSpeed / (n * 2 * radius) : 0;
  return { thrust, torque, power, eta, etaRaw, solidity, tipSpeed, alphaDeg, advanceRatio };
}

function drawStudio() {
  const chord = +$("bladeChord").value / 1000;
  const pitchDeg = +$("bladePitch").value;
  const radius = +$("bladeRadius").value;
  const rpm = +$("rpm").value;
  const flowSpeed = +$("flowSpeed").value;
  const bladeCount = +$("bladeCount").value;
  const est = machineryEstimate({ chord, pitchDeg, radius, rpm, flowSpeed, bladeCount });

  $("bladeChordOut").textContent = (chord * 1000).toFixed(0);
  $("bladePitchOut").textContent = pitchDeg.toFixed(0);
  $("bladeRadiusOut").textContent = radius.toFixed(2);
  $("rpmOut").textContent = rpm.toFixed(0);
  $("flowSpeedOut").textContent = flowSpeed.toFixed(1);
  $("bladeCountOut").textContent = bladeCount.toFixed(0);
  $("studioThrust").textContent = `${fmt(est.thrust, 1)} N`;
  $("studioTorque").textContent = `${fmt(est.torque, 2)} N·m`;
  $("studioPower").textContent = `${fmt(est.power, 0)} W`;
  $("studioEta").textContent = `${fmt(est.eta * 100, 0)}%`;

  const warnings = [];
  if (est.alphaDeg > 14) warnings.push("받음각이 커서 stall/실속 위험이 높다.");
  if (est.alphaDeg < -2) warnings.push("현재 pitch와 유입속도에서는 추력이 거의 나오지 않을 수 있다.");
  if (est.tipSpeed > 170) warnings.push("tip speed가 높다. 소음, 압축성, 구조 하중을 따로 봐야 한다.");
  if (est.solidity > 0.18) warnings.push("local solidity가 높은 편이라 단일 단면 추정 오차가 커질 수 있다.");
  if (est.etaRaw > 0.95) warnings.push("효율 추정이 비현실적으로 높아 클램프되었다. 실제 BEM/시험 데이터가 필요하다.");
  if (est.power > 1500) warnings.push("동력이 큰 편이다. 모터/축/배터리 한계를 확인해야 한다.");
  $("studioWarnings").textContent = warnings.length ? warnings.join(" ") : "경고 없음: 단일 단면 heuristic 범위에서는 무난한 조합이다.";

  const c = $("studioCanvas");
  const ctx = c.getContext("2d");
  const W = c.width;
  const H = c.height;
  clear(ctx, W, H);

  ctx.strokeStyle = "#315074";
  ctx.beginPath();
  ctx.moveTo(58, 255);
  ctx.lineTo(922, 255);
  ctx.moveTo(58, 45);
  ctx.lineTo(58, 255);
  ctx.stroke();
  ctx.fillStyle = "#a9b8cc";
  ctx.fillText("RPM sweep", 58, 28);
  ctx.fillText("thrust / power trend", 760, 285);

  const rpmMin = 300;
  const rpmMax = 12000;
  const samples = [];
  for (let i = 0; i <= 26; i++) {
    const sweepRpm = rpmMin + i * ((rpmMax - rpmMin) / 26);
    const e = machineryEstimate({ chord, pitchDeg, radius, rpm: sweepRpm, flowSpeed, bladeCount });
    samples.push({ rpm: sweepRpm, thrust: e.thrust, power: e.power });
  }
  const maxThrust = Math.max(...samples.map(s => s.thrust), est.thrust, 1);
  const maxPower = Math.max(...samples.map(s => s.power), est.power, 1);

  function point(s, key, max) {
    const x = 58 + (s.rpm - rpmMin) / (rpmMax - rpmMin) * 864;
    const y = 255 - s[key] / max * 190;
    return [x, y];
  }

  ctx.lineWidth = 3;
  ctx.strokeStyle = "#64d8ff";
  ctx.beginPath();
  samples.forEach((s, i) => {
    const [x, y] = point(s, "thrust", maxThrust);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  ctx.strokeStyle = "#d9f99d";
  ctx.beginPath();
  samples.forEach((s, i) => {
    const [x, y] = point(s, "power", maxPower);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  const currentX = 58 + (Math.max(rpmMin, Math.min(rpmMax, rpm)) - rpmMin) / (rpmMax - rpmMin) * 864;
  ctx.strokeStyle = "#fbbf24";
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.moveTo(currentX, 45);
  ctx.lineTo(currentX, 255);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "#64d8ff";
  ctx.fillText("Thrust sweep", 76, 62);
  ctx.fillStyle = "#d9f99d";
  ctx.fillText("Power sweep", 76, 84);
  ctx.fillStyle = "#fbbf24";
  ctx.fillText(`current: J=${est.advanceRatio.toFixed(2)}, solidity=${est.solidity.toFixed(2)}`, 600, 62);
  ctx.fillText(`alpha=${est.alphaDeg.toFixed(1)} deg`, 600, 84);
}

let particles = [];
function hero() {
  const c = $("heroFlow");
  const ctx = c.getContext("2d");
  const W = c.width;
  const H = c.height;
  if (!particles.length) {
    for (let i = 0; i < 120; i++) particles.push({ x: Math.random() * W, y: Math.random() * H, s: 0.5 + Math.random() * 1.8 });
  }
  clear(ctx, W, H);
  ctx.fillStyle = "#64d8ff";
  for (const p of particles) {
    const dy = Math.sin((p.x + Date.now() / 22) / 45) * 1.2;
    p.x += p.s * 1.8;
    p.y += dy * 0.12;
    if (p.x > W) {
      p.x = 0;
      p.y = Math.random() * H;
    }
    ctx.globalAlpha = 0.25 + p.s / 3;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.5 * p.s, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#dbeafe";
  ctx.beginPath();
  ctx.ellipse(260, 150, 74, 28, 0, 0, Math.PI * 2);
  ctx.fill();
  requestAnimationFrame(hero);
}

function updateAll() {
  drawHydro();
  drawVisc();
  drawJump();
  drawPipe();
  drawExt();
  drawStudio();
}

document.querySelectorAll("input,select").forEach(e => e.addEventListener("input", updateAll));
document.querySelectorAll(".check").forEach(btn => btn.addEventListener("click", () => {
  btn.nextElementSibling.textContent = btn.dataset.answer;
}));
updateAll();
hero();
