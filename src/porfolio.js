import emailjs from '@emailjs/browser';

console.log('porfolio.js cargado');

emailjs.init('rXxvImM3UoieeDp0Y');

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');

if (!form) {
    console.error('Formulario no encontrado');
} else {
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // 🚫 evita recarga

        const nameVal = name.value.trim();
        const emailVal = email.value.trim();
        const msgVal = message.value.trim();

        if (!nameVal || !emailVal || !msgVal) {
            status.textContent = 'Completa todos los campos.';
            status.style.color = 'red';
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailVal)) {
            status.textContent = 'Email inválido.';
            status.style.color = 'red';
            return;
        }

        status.textContent = 'Enviando...';
        status.style.color = 'white';

        emailjs
            .sendForm('service_aw2fvr7', 'template_6c4d524', form)
            .then(() => {
                status.textContent = 'Mensaje enviado correctamente ✔';
                status.style.color = 'lightgreen';
                form.reset();
            })
            .catch((err) => {
                console.error(err);
                status.textContent = 'Error al enviar el mensaje.';
                status.style.color = 'red';
            });
    });
}
