import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
// import { instance } from './modal';
import 'flatpickr/dist/flatpickr.min.css';

const chooseDate = document.querySelector('input#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const timerEl = document.querySelector('.timer');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

btnStart.disabled = true;
let userDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const { defaultDate } = options;
    if (selectedDates[0] < defaultDate) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    btnStart.disabled = false;
    userDate = selectedDates[0];
  },
};
class Timer {
  constructor() {
    intervalId: null;
    isActive: false;
  }
  start() {
    if (this.isActive) {
      return;
    }
    this.intervalId = setInterval(() => {
      this.isActive = true;
      chooseDate.disabled = true;

      const countdownTime = userDate - Date.now();
      console.log(countdownTime);
      if (countdownTime >= 0) {
        const componentTime = convertMs(countdownTime);
        markup(componentTime);
      } else {
        clearInterval(this.intervalId);
        timerEl.classList.remove('timer--active');
        chooseDate.disabled = false;
        location.reload();
      }
    }, 1000);
  }
}

function markup({ days, hours, minutes, seconds }) {
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function startTimer() {
  timer.start();
  timerEl.classList.add('timer--active');
}

const timer = new Timer();
flatpickr(chooseDate, options);

btnStart.addEventListener('click', startTimer);
