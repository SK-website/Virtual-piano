const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');
const notes = document.querySelector('.btn-notes');
const letters = document.querySelector('.btn-letters');
const fullscreenBtn = document.querySelector('.fullscreen');
let isDown = false;

function playNote(src) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}
piano.addEventListener('mousedown', (e) => {
  isDown = true;
  if (e.target.classList.contains('piano-key')) {
    const noteName = e.target.dataset.note;
    const src = `assets/audio/${noteName}.mp3`;
    playNote(src);
    const pressedKey = e.target;
    pressedKey.classList.add('piano-key-active');
  }
});

window.addEventListener('mouseup', (e) => {
  isDown = false;
});

piano.addEventListener('mouseover', (e) => {
  if (isDown === true && e.target.classList.contains('piano-key')) {
    const noteName = e.target.dataset.note;
    const src = `assets/audio/${noteName}.mp3`;
    playNote(src);
    const pressedKey = e.target;
    pressedKey.classList.add('piano-key-active');
  }
});
window.addEventListener('keydown', (e) => {
  const code = e.code;
  const pressedKey = [...pianoKeys].find(
    (el) => el.dataset.letter === code.charAt(code.length - 1)
  );
  if (!pressedKey) return;

  const noteName = pressedKey.dataset.note;

  const src = `assets/audio/${noteName}.mp3`;
  playNote(src);
  pressedKey.classList.add('piano-key-active');
});

pianoKeys.forEach((el) => {
  el.addEventListener('transitionend', makeInactive);
});

window.addEventListener('mouseout', (e) => {
  if (e.target.classList.contains('piano-key')) {
    e.target.classList.remove('piano-key-active');
  }
});

function makeInactive(pressedKey) {
  if (pressedKey.propertyName !== 'transform') return;
  this.classList.remove('piano-key-active');
}

notes.addEventListener('click', () => {
  letters.classList.remove('btn-active');
  notes.classList.add('btn-active');
  pianoKeys.forEach((el) => el.classList.remove('piano-key-letter'));
});
letters.addEventListener('click', () => {
  notes.classList.remove('btn-active');
  letters.classList.add('btn-active');
  pianoKeys.forEach((el) => el.classList.add('piano-key-letter'));
});

fullscreenBtn.addEventListener('click', toogleScreen);

function toogleScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.fullscreenEnabled) document.exitFullscreen();
  }
}
