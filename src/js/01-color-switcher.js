const body = document.body;
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);

function startTimer() {
  intervalId = setInterval(getBackgroundColorToBody, 1000);
  startBtn.disabled = true;
}

function stopTimer() {
  clearInterval(intervalId);
  startBtn.disabled = false;
}

function getBackgroundColorToBody() {
  body.style.backgroundColor = getRandomHexColor();
}
console.log(21334);
