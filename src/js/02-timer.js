import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const inputEl = document.getElementById('datetime-picker');

const btnStart = document.querySelector('button[data-start]');

const dayEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

btnStart.disabled = true;

let ms = null;
let selectedDate = null;
let intervalId = null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0];
        ms = selectedDate - options.defaultDate;

        if(ms < 0) {
            window.alert('Please choose a date in the future');
        } else {
            btnStart.disabled = false;
        }
        return;
    }
}

flatpickr(inputEl, options);

btnStart.addEventListener('click', onStart);

function onStart(){
intervalId = setInterval(convertMs, 1000);
}

function convertMs(ms) {
ms = selectedDate - Date.now();

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;


    dayEl.textContent = addLeadingZero(Math.floor(ms / day));

    hoursEl.textContent = addLeadingZero(Math.floor((ms % day) / hour));

    minutesEl.textContent = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

    secondsEl.textContent = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

}

function addLeadingZero(value){
    return String(value).padStart(2, 0)
}