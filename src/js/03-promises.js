import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  submitBtn: document.querySelector('button[type="submit"]'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  refs.submitBtn.disabled = true;

  e.preventDefault();

  let delay = parseInt(refs.delay.value);
  const step = parseInt(refs.step.value);
  const amount = parseInt(refs.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
}

let timeoutId = null;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, rejected) => {
    timeoutId = setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else rejected({ position, delay });
    }, delay);
  });
}
