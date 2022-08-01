const cards = document.querySelectorAll('.card-container');
const banners = document.querySelectorAll('.banner p');
const cardTitles = document.querySelectorAll('.card-p');
const left = document.querySelector('.left');
const right = document.querySelector('.right');
const searchBar = document.getElementById('search');
const vw = screen.width;
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

const moveLeft = (e, card) => {
    e.preventDefault();
    let cardZero;
    if (e.key === 'Backspace' || e.key === 'Shift' || e.key === 'Enter') {
        return;
    }
    if (e.type === 'keyup') {
        cardZero = card;
    } 
    if (card === undefined) {
        cardZero = cards[0];
    }
    cardZero.addEventListener('transitionrun', () => {
        const boundL = cardZero.getBoundingClientRect().left;
        let l = (boundL / vw) * 100;
        if (l > 0) {
            clearInterval(intL);
        }
    });  
    cardZero.addEventListener('transitionstart', () => {
        const boundL = cardZero.getBoundingClientRect().left;
        let l = (boundL / vw) * 100;
        if (l > 0) {
            clearInterval(intL);
        }
    });
    intL = setInterval(() => {
        count++;
        cards.forEach((card) => {
            card.style.transform = `translateX(${count}%)`;
        });
    }, 1);
};

const moveRight = (e, card) => {
    e.preventDefault();
    let lastCard;
    if (e.key === 'Backspace' || e.key === 'Shift' || e.key === 'Enter') {
        return;
    }
    if (e.type === 'keyup') {
        lastCard = card;
    } 
    if (card === undefined) {
        lastCard = cards[cards.length - 1]
    }
    lastCard.addEventListener('transitionstart', () => {
        const boundR = lastCard.getBoundingClientRect().right;
        let r = (boundR / vw) * 100;
        if (r < 100) {
            clearInterval(intR);
        }
    });    
    lastCard.addEventListener('transitionrun', () => {
        const boundR = lastCard.getBoundingClientRect().right;
        let r = (boundR / vw) * 100;
        if (r < 100) {
            clearInterval(intR);
        }
    });
    intR = setInterval(() => {
        count--;
        cards.forEach((card) => {
            card.style.transform = `translateX(${count}%)`;
        });
    }, 1);
};

left.addEventListener('pointerleave', (e) => {
    e.preventDefault();
    clearInterval(intL);
});

right.addEventListener('pointerleave', (e) => {
    e.preventDefault();
    clearInterval(intR);
});

searchBar.addEventListener('keyup', (e) => {
    let val = searchBar.value;
    let firstParent;
    let topParent;
    cardTitles.forEach((title) => {
        let text = title.innerHTML;
        if (text.match(val)) {
            firstParent = title.parentElement;
            topParent = firstParent.parentElement;
            cards.forEach((card) => {
                if (val === '') {
                    return card.style.opacity = '1';
                }
                card.style.opacity = '0';
                topParent.style.opacity = '1';
            });
        }
    });
    let r = (topParent.getBoundingClientRect().right / vw) * 100;
    let l = (topParent.getBoundingClientRect().left / vw) * 100;
    if (r > 100) {
        return moveRight(e, topParent);
    }
    if (l < 0) {
        return moveLeft(e, topParent);
    }
});

left.addEventListener('pointerenter', moveLeft);
right.addEventListener('pointerenter', moveRight);