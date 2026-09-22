"use strict";

// Son copias exactas de las fotografías originales proporcionadas.
// Para cambiar el orden del collage, reordena únicamente esta lista.
const PHOTO_FILES = [
  "6a937d48-793d-4e0e-b2fe-5b5852597b31.jpg",
  "24c8db2d-34b7-421a-809a-a1e5cee81bfa.jpg",
  "e480011e-3004-4e59-a73c-d5b44455ee0f.jpg",
  "ff860883-dfdc-41ea-80f6-ddbf8d69fbd5.jpg",
  "0605f332-5237-46a9-b9c6-bd350fcfdce6.jpg"
];

const PHRASES = [
  "Gracias por llegar a mi vida",
  "Gracias por cada momento juntos",
  "Gracias por hacer mis días más bonitos",
  "Espero que sigamos creando muchos recuerdos",
  "Gracias por estos meses a mi lado"
];

const CAPTIONS = [
  "Tú y yo 💛",
  "Mis momentos favoritos",
  "Contigo todo es más bonito",
  "Siempre juntos",
  "Mi lugar favorito"
];

const TOTAL_DURATION = 42000;
const experience = document.getElementById("experience");
const startButton = document.getElementById("start-button");
const musicButton = document.getElementById("music-button");
const phraseElement = document.getElementById("garden-phrase");
const progressFill = document.getElementById("progress-fill");
const scenes = {
  intro: document.getElementById("intro-scene"),
  flowers: document.getElementById("flower-scene"),
  collage: document.getElementById("collage-scene"),
  final: document.getElementById("final-scene")
};

function seededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

const random = seededRandom(210921);

function sunflowerSvg() {
  const petals = Array.from({ length: 14 }, (_, index) =>
    `<ellipse cx="50" cy="22" rx="10" ry="25" fill="${index % 2 ? "#f2c74c" : "#ffdc68"}" stroke="#dfa937" stroke-width=".6" transform="rotate(${index * 360 / 14} 50 50)"/>`
  ).join("");
  const seeds = Array.from({ length: 11 }, (_, index) => {
    const angle = index * 2.399;
    const radius = Math.sqrt(index / 11) * 15;
    return `<circle cx="${(50 + Math.cos(angle) * radius).toFixed(2)}" cy="${(50 + Math.sin(angle) * radius).toFixed(2)}" r="1.5" fill="#c28c3d" opacity=".8"/>`;
  }).join("");
  return `<svg viewBox="0 0 100 100" aria-hidden="true">${petals}<circle cx="50" cy="50" r="24" fill="#7c542b"/><circle cx="50" cy="50" r="19" fill="#916332"/>${seeds}<circle cx="43" cy="41" r="9" fill="#b3874a" opacity=".25"/></svg>`;
}

function roseSvg() {
  const outer = Array.from({ length: 9 }, (_, index) =>
    `<ellipse cx="50" cy="26" rx="17" ry="29" fill="${index % 2 ? "#f6cc51" : "#ffe080"}" stroke="#e7b83f" stroke-width="1" transform="rotate(${index * 40} 50 50)"/>`
  ).join("");
  const inner = Array.from({ length: 6 }, (_, index) =>
    `<ellipse cx="50" cy="38" rx="14" ry="21" fill="${index % 2 ? "#f9d467" : "#ffeb9d"}" stroke="#eac054" stroke-width="1" transform="rotate(${index * 60 + 12} 50 50)"/>`
  ).join("");
  return `<svg viewBox="0 0 100 100" aria-hidden="true">${outer}${inner}<circle cx="50" cy="50" r="17" fill="#f8d263"/><path d="M62 50c-2-9-16-13-23-4-8 10 3 21 13 16 8-4 6-14-1-15-6-1-9 5-5 8" fill="none" stroke="#d9a637" stroke-width="3" stroke-linecap="round"/></svg>`;
}

function smallFlowerSvg() {
  const petals = Array.from({ length: 10 }, (_, index) =>
    `<ellipse cx="50" cy="24" rx="9" ry="21" fill="${index % 2 ? "#fff0aa" : "#f9d96d"}" stroke="#e7c668" stroke-width=".8" transform="rotate(${index * 36} 50 50)"/>`
  ).join("");
  return `<svg viewBox="0 0 100 100" aria-hidden="true">${petals}<circle cx="50" cy="50" r="14" fill="#dba83c"/><circle cx="46" cy="46" r="5" fill="#f5ca64" opacity=".5"/></svg>`;
}

const FLOWER_HEADS = {
  sunflower: sunflowerSvg(),
  rose: roseSvg(),
  small: smallFlowerSvg()
};

function createFlowers() {
  const field = document.getElementById("flower-field");
  const finalField = document.getElementById("final-flower-field");
  const positions = [0, 4, 8, 13, 18, 22, 27, 32, 37, 41, 46, 50, 55, 59, 64, 68, 73, 77, 82, 86, 91, 96, 100];
  const types = ["small", "rose", "sunflower", "small", "sunflower", "rose", "small", "rose", "sunflower", "small", "rose", "sunflower", "small", "sunflower", "rose", "small", "rose", "sunflower", "small", "rose", "sunflower", "small", "rose"];

  positions.forEach((position, index) => {
    const type = types[index];
    const size = type === "small" ? 49 + random() * 18 : type === "rose" ? 68 + random() * 22 : 76 + random() * 34;
    const height = 240 + random() * 270;
    const flower = document.createElement("div");
    flower.className = `flower flower--${type}`;
    flower.style.cssText = `--x:${position}%;--size:${size.toFixed(0)}px;--height:${height.toFixed(0)}px;--delay:${(index * .46 + random() * .28).toFixed(2)}s;--sway-duration:${(5.5 + random() * 3).toFixed(2)}s;--sway-offset:${(-random() * 6).toFixed(2)}s;z-index:${Math.round(400 - height)};`;
    flower.innerHTML = `<span class="flower__stem"></span><span class="flower__leaf flower__leaf--one"></span><span class="flower__leaf flower__leaf--two"></span><span class="flower__head">${FLOWER_HEADS[type]}</span>`;
    field.appendChild(flower);

    if (index % 3 !== 1) {
      const finalFlower = flower.cloneNode(true);
      finalFlower.style.setProperty("--x", position < 50 ? `${Math.max(-8, position - 16)}%` : `${Math.min(108, position + 16)}%`);
      finalField.appendChild(finalFlower);
    }
  });
}

function createAtmosphere() {
  const petalLayer = document.getElementById("petal-layer");
  const sparkleLayer = document.getElementById("sparkle-layer");
  for (let index = 0; index < 25; index += 1) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.cssText = `--left:${(random() * 100).toFixed(1)}%;--petal-size:${(7 + random() * 10).toFixed(1)}px;--rotation:${(random() * 360).toFixed(0)}deg;--drift:${((random() - .5) * 180).toFixed(0)}px;--duration:${(8 + random() * 8).toFixed(1)}s;--petal-delay:${(-random() * 16).toFixed(1)}s;`;
    petalLayer.appendChild(petal);
  }
  for (let index = 0; index < 24; index += 1) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.style.cssText = `--top:${(7 + random() * 78).toFixed(1)}%;--left:${(random() * 100).toFixed(1)}%;--sparkle-size:${(2 + random() * 3).toFixed(1)}px;--duration:${(2.3 + random() * 3).toFixed(1)}s;--sparkle-delay:${(-random() * 6).toFixed(1)}s;`;
    sparkleLayer.appendChild(sparkle);
  }
}

function createCollage() {
  const board = document.getElementById("collage-board");
  PHOTO_FILES.forEach((fileName, index) => {
    const card = document.createElement("div");
    card.className = "photo-card";
    card.style.setProperty("--card-delay", `${(.35 + index * 1.35).toFixed(2)}s`);

    const tape = document.createElement("span");
    tape.className = "photo-card__tape";
    tape.setAttribute("aria-hidden", "true");

    const imageWrap = document.createElement("div");
    imageWrap.className = "photo-card__image-wrap";
    const image = document.createElement("img");
    image.className = "photo-card__image";
    image.src = `images/${encodeURIComponent(fileName)}`;
    image.alt = `Fotografía original de nuestro recuerdo ${index + 1}`;
    image.decoding = "async";
    imageWrap.appendChild(image);

    const caption = document.createElement("div");
    caption.className = "photo-card__caption";
    caption.textContent = CAPTIONS[index] || "Un recuerdo contigo 💛";
    card.append(tape, imageWrap, caption);
    board.appendChild(card);
  });

  ["♥", "✦", "♥", "✿", "♥"].forEach((symbol, index) => {
    const accent = document.createElement("span");
    accent.className = "collage-accent";
    accent.textContent = symbol;
    accent.setAttribute("aria-hidden", "true");
    accent.style.setProperty("--accent-index", index);
    board.appendChild(accent);
  });
}

function showScene(name) {
  Object.entries(scenes).forEach(([key, scene]) => {
    const active = key === name;
    scene.classList.toggle("is-active", active);
    scene.setAttribute("aria-hidden", String(!active));
  });
}

let phraseTimeout = null;
function showPhrase(text, immediate = false) {
  clearTimeout(phraseTimeout);
  phraseElement.classList.remove("is-entering", "is-leaving");
  if (!immediate && phraseElement.textContent) {
    phraseElement.classList.add("is-leaving");
    phraseTimeout = window.setTimeout(() => enterPhrase(text), 430);
  } else {
    enterPhrase(text);
  }
}

function enterPhrase(text) {
  phraseElement.textContent = text;
  phraseElement.classList.remove("is-leaving", "is-entering");
  void phraseElement.offsetWidth;
  phraseElement.classList.add("is-entering");
}

// Una melodía instrumental muy suave, creada en el navegador. Solo se inicia
// dentro del gesto de pulsar el botón, como requieren los navegadores móviles.
let audioContext = null;
let masterGain = null;
let musicTimer = null;
let musicStep = 0;
let nextNoteTime = 0;
let musicEnabled = true;
const BEAT = .58;
const CHORDS = [
  [53, 57, 60, 64], // Fa mayor séptima
  [48, 52, 55, 59], // Do mayor séptima
  [45, 48, 52, 55], // La menor séptima
  [43, 47, 50, 55]  // Sol mayor
];

function midiToFrequency(midi) { return 440 * Math.pow(2, (midi - 69) / 12); }

function playNote(midi, time, length, volume, waveform = "sine") {
  if (!audioContext || !masterGain) return;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = waveform;
  oscillator.frequency.setValueAtTime(midiToFrequency(midi), time);
  gain.gain.setValueAtTime(.0001, time);
  gain.gain.exponentialRampToValueAtTime(volume, time + .04);
  gain.gain.exponentialRampToValueAtTime(.0001, time + length);
  oscillator.connect(gain);
  gain.connect(masterGain);
  oscillator.start(time);
  oscillator.stop(time + length + .02);
}

function scheduleMusic() {
  if (!audioContext || !musicEnabled) return;
  while (nextNoteTime < audioContext.currentTime + .45) {
    const bar = Math.floor(musicStep / 4) % CHORDS.length;
    const beat = musicStep % 4;
    const chord = CHORDS[bar];
    if (beat === 0) {
      playNote(chord[0] - 12, nextNoteTime, BEAT * 3.6, .13, "triangle");
      playNote(chord[1], nextNoteTime, BEAT * 3.3, .035);
      playNote(chord[2], nextNoteTime, BEAT * 3.3, .035);
    }
    const melody = [chord[2] + 12, chord[3] + 12, chord[1] + 12, chord[3] + 12][beat];
    playNote(melody, nextNoteTime, BEAT * 1.9, .12);
    nextNoteTime += BEAT;
    musicStep += 1;
  }
}

async function startMusic() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    musicButton.hidden = true;
    return;
  }
  try {
    audioContext = new AudioContextClass();
    masterGain = audioContext.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(audioContext.destination);
    await audioContext.resume();
    masterGain.gain.setTargetAtTime(.27, audioContext.currentTime, .7);
    nextNoteTime = audioContext.currentTime + .06;
    scheduleMusic();
    musicTimer = window.setInterval(scheduleMusic, 170);
  } catch {
    musicEnabled = false;
    musicButton.hidden = true;
  }
}

function toggleMusic() {
  if (!audioContext || !masterGain) return;
  musicEnabled = !musicEnabled;
  musicButton.setAttribute("aria-pressed", String(musicEnabled));
  musicButton.setAttribute("aria-label", musicEnabled ? "Desactivar música" : "Activar música");
  if (musicEnabled) {
    audioContext.resume();
    nextNoteTime = audioContext.currentTime + .05;
    masterGain.gain.setTargetAtTime(.27, audioContext.currentTime, .18);
    scheduleMusic();
  } else {
    masterGain.gain.setTargetAtTime(0, audioContext.currentTime, .12);
  }
}

const cues = [
  [1000, () => showPhrase(PHRASES[0], true)],
  [4200, () => showPhrase(PHRASES[1])],
  [7400, () => showPhrase(PHRASES[2])],
  [10600, () => showPhrase(PHRASES[3])],
  [13800, () => showPhrase(PHRASES[4])],
  [18500, () => showScene("collage")],
  [32000, () => showScene("final")]
];

let started = false;
let elapsed = 0;
let lastFrame = 0;
let cueIndex = 0;

function timelineFrame(now) {
  if (!document.hidden) {
    elapsed = Math.min(TOTAL_DURATION, elapsed + Math.min(now - lastFrame, 250));
    while (cueIndex < cues.length && elapsed >= cues[cueIndex][0]) {
      cues[cueIndex][1]();
      cueIndex += 1;
    }
    progressFill.style.width = `${(elapsed / TOTAL_DURATION * 100).toFixed(2)}%`;
  }
  lastFrame = now;
  if (elapsed < TOTAL_DURATION) requestAnimationFrame(timelineFrame);
}

function startExperience() {
  if (started) return;
  started = true;
  startButton.disabled = true;
  musicButton.hidden = false;
  experience.classList.add("has-started");
  showScene("flowers");
  startMusic();
  lastFrame = performance.now();
  requestAnimationFrame(timelineFrame);
}

document.addEventListener("visibilitychange", () => {
  if (!started) return;
  experience.classList.toggle("is-paused", document.hidden);
  if (audioContext) {
    if (document.hidden) audioContext.suspend();
    else if (musicEnabled) audioContext.resume();
  }
  lastFrame = performance.now();
});

createFlowers();
createAtmosphere();
createCollage();
startButton.addEventListener("click", startExperience);
musicButton.addEventListener("click", toggleMusic);
