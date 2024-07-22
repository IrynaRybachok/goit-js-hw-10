// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
import sprite from '../img/sprite.svg';

const form = document.querySelector(".form");
form.addEventListener("submit", handleCreateNot);

function handleCreateNot(event){
    event.preventDefault();

    const delay = Number(event.currentTarget.elements.delay.value);
    const radioCheck = event.currentTarget.elements.state.value;
    
    const makeForm = (delay) => {
        return new Promise ((res, rej) => {
            setTimeout(() => {
                if( radioCheck  === 'fulfilled'){    
                    res(iziToast.success({
                        title: 'Ok',
                        titleSize: '16px',
                        titleColor: '#FFFFFF',
                        titleLineHeight: '24px',
                        message: `Fulfilled promise in ${delay}ms`,
                        messageColor: '#FFFFFF',
                        messageSize: '16px',
                        messageLineHeight: '24px',
                        backgroundColor: '#59A10D',
                        position: 'topRight',
                        iconUrl: `${sprite}#icon-check-mark`,
                    }))
                }else{
                    rej(iziToast.error({
                        title: 'Error',
                        titleSize: '16px',
                        titleColor: '#FFFFFF',
                        titleLineHeight: '24px',
                        message: `Rejected promise in ${delay}ms`,
                        messageColor: '#FFFFFF',
                        messageSize: '16px',
                        messageLineHeight: '24px',
                        backgroundColor: '#EF4040',
                        position: 'topRight',
                        iconUrl: `${sprite}#icon-x-round`,
                    }))
    
                }
            }, delay);
        })
    }

    makeForm(delay)
    .then((delay) => console.log(delay))
    .catch((delay) => console.log(delay));
    
    form.reset();
}