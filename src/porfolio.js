import emailjs from '@emailjs/browser';

console.log('porfolio.js cargado');

emailjs.init('rXxvImM3UoieeDp0Y');

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const messageError = document.getElementById('message-error');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');

if (!form) {
    console.error('Formulario no encontrado');
} else {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameVal = name.value.trim();
        const emailVal = email.value.trim();
        const msgVal = message.value.trim();

        let isValid = true;

        if (nameVal === '') {
            nameError.textContent = 'El nombre es obligatorio.';
            name.style.border = '1px solid red';
            isValid = false;
        } else {
            nameError.textContent = '';
            name.style.border = '1px solid #50d71e';
        }
        if (msgVal === '') {
            messageError.textContent = 'El mensaje es obligatorio.';
            message.style.border = '1px solid red';
            isValid = false;
        } else {
            messageError.textContent = '';
            message.style.border = '1px solid #50d71e';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailVal)) {
            emailError.textContent = 'Email inválido.';
            email.style.border = '1px solid red';
            isValid = false;
        } else {
            emailError.textContent = '';
            email.style.border = '1px solid #50d71e';
        }

        if (isValid) {
            status.textContent = 'Enviando...';
            status.style.color = 'white';

            emailjs
                .sendForm('service_aw2fvr7', 'template_6c4d524', form)
                .then(() => {
                    status.textContent = 'Mensaje enviado correctamente ✔';
                    status.style.color = 'lightgreen';
                    name.style.border = '1px solid border-gray-600';
                    email.style.border = '1px solid border-gray-600';
                    message.style.border = '1px solid border-gray-600';
                    form.reset();
                })
                .catch((err) => {
                    console.error(err);
                    status.textContent = 'Error al enviar el mensaje.';
                    status.style.color = 'red';
                });


        } else {
            status.textContent = '';
        }

    });
}
