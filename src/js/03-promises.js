
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', submitForm);

function submitForm(e) {

  e.preventDefault();

  const delay = Number(this.delay.value);
  const step = Number(this.step.value);
  const amount = Number(this.amount.value);

  for (let i = 0; i < amount; i += 1) {
    let position = i + 1;
    let delayEl = delay + step * i;

    createPromise(position, delayEl)
      .then(({ position, delayEl }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay} ms`);
      })
      .catch(({ position, delayEl }) => {
        Notify.failure(`Rejected promise ${position} in ${delay} ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}