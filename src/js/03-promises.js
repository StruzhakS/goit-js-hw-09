import Notiflix from 'notiflix';

const submitBtn = document.querySelector('button');
const input = document.querySelector('.form');
const step = input.elements.step;
const delay = input.elements.delay;
const amount = input.elements.amount;

input.addEventListener('submit', submitForClick);

function submitForClick(evt) {
  evt.preventDefault();
  let currentDelayValue = Number(delay.value);
  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, currentDelayValue)
      .then(data => Notiflix.Notify.success(`${data}`))
      .catch(error => Notiflix.Notify.failure(`${error}`));
    currentDelayValue += Number(step.value);
  }
}
Notiflix;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
  });
}
