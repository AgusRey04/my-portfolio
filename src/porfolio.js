
(function () {

    if (typeof emailjs === 'undefined') {
        console.warn('EmailJS SDK no encontrado. Asegúrate de cargar https://cdn.emailjs.com/dist/email.min.js antes de este script.');
        // Mostrar fallo en la UI si es posible
        const statusEl = document.getElementById('form-status');
        if (statusEl) {
            statusEl.textContent = 'Error: EmailJS SDK no cargado. Comprueba la consola.';
            statusEl.style.color = 'red';
        }
        return;
    }

    emailjs.init('rXxvImM3UoieeDp0Y');
    console.log('EmailJS inicializado (public key proporcionada).');

    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    if (!form) return;

    console.log('Formulario contact-form detectado:', !!form);

    // Limpia el estilo de error y el mensaje de estado al escribir
    const clearFieldError = (el) => {
        if (!el) return;
        el.style.borderColor = '';
        if (status) status.textContent = '';
    };

    [name, email, message].forEach((el) => {
        if (!el) return;
        el.addEventListener('input', () => clearFieldError(el));
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameVal = (name && name.value || '').trim();
        const emailVal = (email && email.value || '').trim();
        const msgVal = (message && message.value || '').trim();

        const missing = [];
        if (!nameVal) missing.push('Nombre');
        if (!emailVal) missing.push('Email');
        if (!msgVal) missing.push('Mensaje');

        // validación simple de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailVal && !emailRegex.test(emailVal)) {
            if (email) email.style.borderColor = 'red';
            if (status) { status.textContent = 'Email inválido.'; status.style.color = 'red'; };
            return;
        }

        if (missing.length) {
            if (!nameVal && name) name.style.borderColor = 'red';
            if (!emailVal && email) email.style.borderColor = 'red';
            if (!msgVal && message) message.style.borderColor = 'red';
            if (status) {
                status.textContent = 'Por favor completa: ' + missing.join(', ');

                status.style.color = 'red';
            };
            setTimeout(() => { if (status) status.textContent = ''; }, 5000);
            return;
        }

        if (status) status.textContent = 'Enviando...';
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;
        // Enviar usando EmailJS y mostrar errores detallados para depuración
        try {
            emailjs.sendForm('service_aw2fvr7', 'template_6c4d524', this)
                .then(function (response) {
                    console.log('EmailJS success:', response);
                    if (status) {
                        status.textContent = 'Mensaje enviado. ¡Gracias!';
                        status.style.color = 'lightgreen';
                    }
                    form.reset();
                    if (submitBtn) submitBtn.disabled = false;
                    setTimeout(() => { if (status) status.textContent = ''; }, 5000);
                })
                .catch(function (err) {
                    console.error('EmailJS error (catch):', err);
                    if (status) {
                        let msg = 'Error al enviar. Comprueba consola.';
                        try {
                            if (err && err.text) msg = 'Error: ' + err.text;
                            else if (err && err.status) msg = `Error ${err.status}: ${err.statusText || JSON.stringify(err)}`;
                        } catch (e) {
                            msg = 'Error inesperado al enviar.';
                        }
                        status.textContent = msg;
                        status.style.color = 'red';
                    }
                    if (submitBtn) submitBtn.disabled = false;
                    setTimeout(() => { if (status) status.textContent = ''; }, 5000);
                });
        } catch (ex) {
            console.error('Exception al llamar a emailjs.sendForm:', ex);
            if (status) { status.textContent = 'Error inesperado. Revisa la consola.'; status.style.color = 'red'; }
            if (submitBtn) submitBtn.disabled = false;
            setTimeout(() => { if (status) status.textContent = ''; }, 5000);
        }
    });
})();

