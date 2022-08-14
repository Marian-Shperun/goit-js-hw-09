import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
let { delay, step, amount } = formEl;

formEl.addEventListener('submit', satart);

function satart(e) {
  e.preventDefault();
  let delaySelected = +delay.value;
  let stepDelaySelected = +step.value;
  let amountSelected = +amount.value;

  for (let i = 0; i < amountSelected; i += 1) {
    createPromise(i + 1, delaySelected)
      .then(resSuccess)
      .catch(resError);

    // перезаписує значення delaySelected
    delaySelected += stepDelaySelected;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // передає {} з валастивосятми
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function resSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}
function resError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
