const projectsSection = document.querySelector('.sec-3');
const cards = document.querySelectorAll('.card-container');
const banners = document.querySelectorAll('.banner p');
const cardTitles = document.querySelectorAll('.card-p');
const left = document.querySelector('.left');
const right = document.querySelector('.right');
const searchBar = document.getElementById('search');
const orangeBox = document.querySelector('.orange-box');
const pinkBox = document.querySelector('.pink-box');
const vw = screen.width;
let intL;
let intR;
let count = 0;
let bannerNum = 0;

export const scrollProjects = () => {
    orangeBox.style.transform = 'translateX(0)';
    pinkBox.style.transform = 'translateX(0)';
    searchBar.style.transform = 'translateX(0)';
};

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

export const help = () => {
    const message = document.querySelector('.sec-3 .help-message');
    if (message === null) {
        const helpMessage = document.createElement('div');
            helpMessage.classList.add('help-message');
            if (window.innerWidth > 1300) {
                helpMessage.innerHTML = 'hover over the left or the right side of the screen to move through projects';
            } 
            if (window.innerWidth <= 1300) {
                helpMessage.innerHTML = 'touch and hold on the left or the right side of the screen to move through projects';
            }
            projectsSection.appendChild(helpMessage);
            setTimeout(() => {
                helpMessage.style.opacity = '1';
                helpMessage.style.transform = 'translateX(0)';
            }, 1000);
            setTimeout(() => {
                helpMessage.style.opacity = '0';
            }, 5000);
    } else {
        return;
    }
};

left.addEventListener('pointerenter', moveLeft);
right.addEventListener('pointerenter', moveRight);
