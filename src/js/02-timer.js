import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('input#datetime-picker'),
  timerBtn: document.querySelector('.timer-btn'),
  seconds: document.querySelector('[data-seconds]'),
  minutes: document.querySelector('[data-minutes]'),
  hours: document.querySelector('[data-hours]'),
  days: document.querySelector('[data-days]'),
};

let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.warning('Please choose a date in the future', {
        timeout: 4000,
      });
      return;
    }
    if (selectedDates[0] > options.defaultDate) {
      refs.timerBtn.disabled = false;
    }
  },
};

refs.timerBtn.addEventListener('click', onBtnStart);

refs.timerBtn.disabled = true;

flatpickr(refs.input, options);

const seconds = refs.seconds.textContent;
const minutes = refs.minutes.textContent;
const hours = refs.hours.textContent;
const days = refs.days.textContent;

let intervalId = null;

function onBtnStart() {
  intervalId = setInterval(() => {
    const currentTime = Date.now();

    const plannedTime = new Date(refs.input.value).getTime();

    const { seconds, minutes, hours, days } = convertMs(
      plannedTime - currentTime
    );
    updateTimer({ seconds, minutes, hours, days });

    if (intervalId !== null) {
      refs.timerBtn.disabled = true;
      refs.input.disabled = true;
    }
    if (
      parseInt(seconds) === 0 &&
      parseInt(minutes) === 0 &&
      parseInt(hours) === 0 &&
      parseInt(days) === 0
    ) {
      clearInterval(intervalId);
      refs.input.disabled = false;
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
function updateTimer({ seconds, minutes, hours, days }) {
  refs.seconds.textContent = seconds;
  refs.minutes.textContent = minutes;
  refs.hours.textContent = hours;
  refs.days.textContent = days;
}
