document.addEventListener('DOMContentLoaded', function () {
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeButton');
    const modal = document.getElementById('modal');
    const form = document.getElementById('modalForm');
    const submitButton = document.getElementById('submitButton');
    const cancelButton = document.getElementById('cancelButton');

    if (openModalBtn && modal && form && submitButton && closeButton) {
        function openModal() {
            modal.style.display = 'block';
        }

        function closeModal() {
            modal.style.display = 'none';
        }

        openModalBtn.addEventListener('click', openModal);

        closeModalBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', function (event) {
            if (event.target === modal) {
                closeModal();
            }
        });

        const checkFormValidity = () => {
            const isValid = form.checkValidity();
            submitButton.disabled = !isValid;
        };

        form.addEventListener('input', checkFormValidity);

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            if (form.checkValidity()) {

                console.log('Form submitted successfully!');
   console.log('Form data:', {
                    name: form.elements['name'].value,
                    phone: form.elements['phone'].value,
                    email: form.elements['email'].value,
                    direction: form.elements['direction'].value,
                });
            } else {
                console.log('Форма недействительна. Заполните все обязательные поля, пожалуйста.');
            }
        });

        function clearForm() {
            form.reset(); 
            closeModal();
        }

        cancelButton.addEventListener('click', clearForm);
    }

});



