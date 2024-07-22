// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

import sprite from '../img/sprite.svg';

const btnStart = document.querySelector("[data-start]");
const calendar = document.querySelector("#datetime-picker");
const dataDays = document.querySelector("[data-days]");
const dataHours = document.querySelector("[data-hours]");
const datamMinutes = document.querySelector("[data-minutes]");
const dataSeconds = document.querySelector("[data-seconds]");
btnStart.addEventListener("click", handleStartTimer);

btnStart.disabled = true;

let userSelectedDate = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if( selectedDates[0].getTime() < Date.now() ){
            iziToast.show({
                title: '',
                message: 'Please choose a date in the future', 
                messageSize: '16px',
                position: 'topRight',
                backgroundColor: '#EF4040',
                messageColor: '#FAFAFB',
                color: '#FAFAFB',
                iconUrl: `${sprite}#icon-x-round`,
                iconColor: '#FAFAFB',

            });
        }else{
            userSelectedDate = selectedDates[0].getTime();
            btnStart.disabled = false;
        }
        console.log(selectedDates[0]);
    },
};

const fr = flatpickr("#datetime-picker", options);

let intervalID = 0;

function handleStartTimer(){
    if (intervalID){
        return;
    }
    intervalID = setInterval(() => {
        btnStart.disabled = true;
        calendar.disabled = true;

        const diffTime = userSelectedDate - Date.now();
        const {days, hours, minutes, seconds} = convertMs(diffTime);

        dataDays.textContent = addLeadingZero(days);
        dataHours.textContent = addLeadingZero(hours);
        datamMinutes.textContent = addLeadingZero(minutes);
        dataSeconds.textContent = addLeadingZero(seconds);

        const isTimerFinished = [days, hours, minutes, seconds].every(value => value === 0);

        if (isTimerFinished) {
            clearInterval(intervalID);
            calendar.disabled = false;
        }
    }, 1000)
    
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value){
    return String(value).padStart(2, "0");
}


