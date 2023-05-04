import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');
let selectedDate;
let timerId;

const options = {
  dateFormat: 'd.m.Y',
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0];
    if (selectedDates[0] - new Date() < 0) {
      startBtn.disabled = true;
      Notiflix.Report.failure('Please choose a date in the future"', '');
      //   alert('Please choose a date in the future');
      return;
    }
    startBtn.disabled = false;
  },
};

const calendar = flatpickr(input, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTime() {
  const currentDay = Date.now();
  const differenceTime = selectedDate - currentDay;
  if (differenceTime < 0) {
    clearInterval(timerId);
    input.disabled = false;
    startBtn.disabled = false;
    Notiflix.Report.success('Timer is done', '', 'Okay');
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(differenceTime);
  day.textContent = addLeadingZero(days);
  hour.textContent = addLeadingZero(hours);
  minute.textContent = addLeadingZero(minutes);
  second.textContent = addLeadingZero(seconds);
}

startBtn.addEventListener('click', setTimer);
function setTimer() {
  startBtn.disabled = true;
  input.disabled = true;

  timerId = setInterval(updateTime, 1000);
}

function addLeadingZero(value) {
  value = value.toString().padStart(2, '0');
  return value;
}
startBtn.disabled = true;
