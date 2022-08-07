const form = document.querySelector('.contact-form');
const inputs = document.querySelectorAll('.contact-form input');
const labels = document.querySelectorAll('.contact-form label');
const textArea = document.querySelector('textarea');
const submitBtn = document.querySelector('.form-submission');
const tel = document.getElementById('tel');
const email = document.getElementById('email');
const text = document.getElementById('text');
const notValid = document.querySelector('.not-valid');
const contactSection = document.querySelector('.sec-5');

export const scrollContact = () => {
    for (let k = 0; k < labels.length; k++) {
        setTimeout(() => {
            labels[k].style.opacity = '1';
        }, 100 * k);
    }
    for (let k = 0; k < inputs.length; k++) {
        setTimeout(() => {
            setTimeout(() => {
                inputs[k].style.opacity = '1';
            }, 200 * k);
        }, 350);
        setTimeout(() => {
            textArea.style.opacity = '1';
        }, 800);
    }
    setTimeout(() => {
        submitBtn.style.opacity = '1';
    }, 900);
};

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

const showForm = () => {
    const submissionDiv = document.createElement('div');
    const closeBtn = document.createElement('button');
    const confirmContainer = document.createElement('div');
    const heading = document.createElement('h3');
    const paragraph = document.createElement('p');
    submissionDiv.className = 'submission-conformation';
    closeBtn.className = 'close-me';
    heading.innerHTML = 'Thank You!!';
    paragraph.innerHTML = 'Your message has been received and I will be getting in touch with you as soon as possible!';
    closeBtn.innerHTML = 'Close';
    submissionDiv.appendChild(confirmContainer);
    confirmContainer.appendChild(heading);
    confirmContainer.appendChild(paragraph);
    contactSection.appendChild(submissionDiv);
    submissionDiv.appendChild(closeBtn);
    
    closeBtn.addEventListener('click', () => {
        submissionDiv.style.display = 'none';
    });
};

submitBtn.addEventListener('click', (e) => {
    const conformation = document.querySelector('.submission-conformation');
    if (conformation !== null && email.value === '' || tel.value === '' || text.value === '') {
        notValid.innerHTML = 'Please fill out the form before submission';
        notValid.style.opacity = '1';
        setTimeout(() => {
            notValid.style.opacity = '0';
            notValid.innerHTML = 'Not Valid';
        }, 5000);
    }
    e.preventDefault();
    if (notValid.style.opacity === '1') {
        return alert('Your form is not valid. Please enter a valid email address & phone number');
    }
    form.reset();
    showForm();
});