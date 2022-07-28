const cards = document.querySelectorAll('.card-container');
const left = document.querySelector('.left');
const right = document.querySelector('.right');
let intL;
let intR;
let count = 0;

left.addEventListener('pointerenter', (e) => {
    e.preventDefault();
    intL = setInterval(() => {
        count += 3;
        cards.forEach((card) => {
            card.style.transform = `translateX(${count}%)`;
        })
    }, 10);
});
left.addEventListener('pointerleave', (e) => {
    e.preventDefault();
    clearInterval(intL);
});
right.addEventListener('pointerenter', (e) => {
    e.preventDefault();
    intR = setInterval(() => {
        count -= 3;
        cards.forEach((card) => {
            card.style.transform = `translateX(${count}%)`;
        })
    }, 10);
});
right.addEventListener('pointerleave', (e) => {
    e.preventDefault();
    clearInterval(intR);
});

