const cards = document.querySelectorAll('.card-container');
const banners = document.querySelectorAll('.banner p');
const left = document.querySelector('.left');
const right = document.querySelector('.right');
let intL;
let intR;
let count = 0;
let bannerNum = 0;

const increment = (banner) => {
    bannerNum++;
    banner.innerHTML = `${bannerNum}`;
};

banners.forEach((banner) => {
    increment(banner);
});


left.addEventListener('pointerenter', (e) => {
    e.preventDefault();
    intL = setInterval(() => {
        count += 2;
        cards.forEach((card) => {
            card.style.transform = `translateX(${count}%)`;
        });
    }, 1);
});
left.addEventListener('pointerleave', (e) => {
    e.preventDefault();
    clearInterval(intL);
});
right.addEventListener('pointerenter', (e) => {
    e.preventDefault();
    intR = setInterval(() => {
        count -= 2;
        cards.forEach((card) => {
            card.style.transform = `translateX(${count}%)`;
        });
    }, 1);
});
right.addEventListener('pointerleave', (e) => {
    e.preventDefault();
    clearInterval(intR);
});

// cards[0].addEventListener('transitionrun', () => {
//     let boundL = cards[0].getBoundingClientRect().left;
//     if (boundL > -200) {
//         clearInterval(intL);
//     }
// });

// cards[cards.length - 1].addEventListener('transitionrun', () => {
//     let boundR = cards[cards.length - 1].getBoundingClientRect().right;
//     if (boundR < 500) {
//         clearInterval(intR);
//     }
// });