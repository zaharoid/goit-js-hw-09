const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let intervalId = null;

refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', onBtnStart);
refs.stopBtn.addEventListener('click', onBtnStop);

function onBtnStart() {
  intervalId = setInterval(
    () => (document.body.style.backgroundColor = getRandomHexColor()),
    1000
  );
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
}

function onBtnStop() {
  clearInterval(intervalId);
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
