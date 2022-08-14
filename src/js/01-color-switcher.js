const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let intervalId = null;

btnStop.disabled = true;

btnStart.addEventListener('click', handlerOnClickStart);
btnStop.addEventListener('click', handlerOnClickStop);

function handlerOnClickStart() {
  btnStart.disabled = true;
  btnStop.disabled = false;

  changeColorBody();
}
function handlerOnClickStop() {
  btnStart.disabled = false;
  btnStop.disabled = true;
  
  clearInterval(intervalId);
}

function changeColorBody() {
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
