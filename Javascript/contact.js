const form = document.querySelector('.contact-form');
const inputs = document.querySelectorAll('.contact-form input');
const labels = document.querySelectorAll('contact-form label');
const submitBtn = document.querySelector('.form-submission');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    form.submit();
    form.reset();
});