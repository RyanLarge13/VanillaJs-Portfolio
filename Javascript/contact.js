const form = document.querySelector('.contact-form');
const inputs = document.querySelectorAll('.contact-form input');
const labels = document.querySelectorAll('contact-form label');
const submitBtn = document.querySelector('.form-submission');
const tel = document.getElementById('tel');
const email = document.getElementById('email');
const text = document.getElementById('text');
const notValid = document.querySelector('.not-valid');

tel.addEventListener('keyup', () => {
    const value = tel.value;
    const regex = new RegExp('[-\s\./0-9]');
    !value.match(regex) ? notValid.style.opacity = '1' : notValid.style.opacity = '0';
    if (value === '') {
        notValid.style.opacity = '0';
    }

});

email.addEventListener('keyup', () => {
    const value = email.value;
    !value.includes('@') ? notValid.style.opacity = '1' : notValid.style.opacity = '0';
    if (value === '') {
        notValid.style.opacity = '0';
    }
});

text.addEventListener('keyup', () => {
    const value = text.value;
    const length = value.length;
    length >= 400 ? ((notValid.innerHTML = 'Too Long!!'), (notValid.style.opacity = '1')) : 
    length < 400 ? ((notValid.innerHTML = 'Not Valid'), (notValid.style.opacity = '0')) : '';
});

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    form.submit();
    form.reset();
});