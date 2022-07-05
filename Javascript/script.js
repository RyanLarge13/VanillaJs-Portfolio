import { chatDisplay } from './agoraRTM.js';

const navToggle = document.querySelector('.nav-toggle-body');
const spans = document.querySelectorAll('.nav-toggle-body span');
const nav = document.querySelector('nav');
const navListItems = document.querySelectorAll('nav ul li');
const introCircles = document.querySelectorAll('.intro-circle');
const introText = Array.from(document.querySelector('.introduction').children);
const vh = document.querySelector('.intro-container').clientHeight;
const navDots = Array.from(document.querySelectorAll('.nav-dot'));
const sections = Array.from(document.querySelectorAll('[data-section]'));
const agoraButton = document.querySelector('.agora-btn');
const closeChatBox = document.querySelector('.agora-chatbox i');
let navItemsArr = Array.from(navListItems);
let screenWidth = window.innerWidth;

const navlistSwitch = () => {
    if (screenWidth <= 900) {
        navListItems[3].before(navListItems[4]);
    } else if (screenWidth > 900) {
        navListItems[3].after(navListItems[4]);
    }
};
navlistSwitch();

//mobile nav
const navDisplay = () => { 
    spans.forEach(line => {
        line.classList.toggle('span-toggled');
    });
    nav.classList.toggle('transform-scale');
    setTimeout(() => {
        navListItems.forEach(item => {
            item.classList.toggle('opacity');
        })
    }, 250);
};
navToggle.addEventListener('click', navDisplay);

navListItems.forEach(li => {
    li.firstChild.addEventListener('click', navDisplay);
});

const highlightName = () => {
        navListItems[2].firstChild.classList.add('highlight-menu');
};


const circleScale = () => {
    setTimeout(() => {
        introCircles.forEach(circle => {
            circle.style.transform = 'scale(1)';
        }, 500);
    });
    introTextSlide();
};

const scaleScroll = () => {
    if (scrollY > 700) {
        introCircles.forEach(circle => {
            circle.style.transform = 'scale(0)';
        });
        introText.forEach(elem => {
            elem.style.transform = 'translateX(-6em)';
            elem.style.opacity = '0';
        });
    } 
};

const introTextSlide = () => {
    introText.forEach(elem => {
        elem.style.transform = 'translateX(0)';
        elem.style.opacity = '1';
    });
};

const navIndicate = (linksArray) => {
    for (let k = 0; k < sections.length; k++) {
        let boundT = sections[k].getBoundingClientRect().top;
        let boundB = sections[k].getBoundingClientRect().bottom;
        // console.log(`${sections[k]} = ${boundT} : ${boundB}`);
        if (boundT >= -vh && boundB > vh / 2 && boundB < vh * 1.5) {
            linksArray[sections.indexOf(sections[k])].firstChild.classList.add('highlight-menu');
            navDots[sections.indexOf(sections[k])].classList.add('navdot-indicator');
        } else {
            linksArray[k].firstChild.classList.remove('highlight-menu');
            navDots[k].classList.remove('navdot-indicator');
        }
    }
};

navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        window.scrollTo(0, (vh * index));
    });
});

const highlightMenu = (arr) => {
    [arr[3], arr[4]] = [arr[4], arr[3]];
    [arr[2], arr[0]] = [arr[0], arr[2]];
    [arr[1], arr[2]] = [arr[2], arr[1]];
};
highlightMenu(navItemsArr);

// going into script for Resume section
const skillParent = document.querySelector('.skill-parent');
const skillIcons = document.querySelectorAll('.skill-icon');
const leftArrow = document.querySelector('.fa-caret-left');
const rightArrow = document.querySelector('.fa-caret-right');
let count = 0;
let width = skillIcons[0].clientWidth * 2;
let start;
let move;
const skillParagraphs = document.querySelectorAll('.skill-detail p');

const displayIcons = () => {
    skillIcons[4].style.opacity = '1';
    skillParagraphs[3].style.opacity = '1';
    skillParagraphs[3].style.transform = 'translateX(0) translateY(-50%)';
}

const slider = (e) => {
    if (e.target === rightArrow) {
        count++;
        skillParent.style.transition = '250ms ease-in-out';
        skillParent.style.transform = `translateX(${-width * count}px)`;
        skillIcons[count + 3].style.opacity = '0';
        skillIcons[count + 4].style.opacity = '1';
    }
    if (e.target === leftArrow) {
        count--;
        skillParent.style.transition = '250ms ease-in-out';
        skillParent.style.transform = `translateX(${-width * count}px)`;
        skillIcons[count + 5].style.opacity = '0';
        skillIcons[count + 4].style.opacity = '1';
    }

    if (count === -4) {
        count = 3;
        skillParent.addEventListener('transitionend', () => {
            skillParent.style.transition = 'none';
            skillParent.style.transform = `translateX(${(-width * count)}px)`;
            if (count === 3) {
                skillIcons[count + 4].style.opacity = '1';
            }
        });
    }
    if (count === 4) {
        count = -3;
        skillParent.addEventListener('transitionend', () => {
            skillParent.style.transition = 'none';
            skillParent.style.transform = `translateX(${-width * count}px)`;
            if (count === -3) {
                skillIcons[1].style.opacity = '1';
            }
        });
    }

    paraSlider(count, e);
};

const paraSlider = (count, e) => {
    if (e.target === rightArrow) {
        if (count === -3) {
            skillParagraphs[skillParagraphs.length - 1].style.opacity = '0';
            skillParagraphs[skillParagraphs.length - 1].style.transform = 'translateX(10em)';
        }
        skillParagraphs[count + 3].style.opacity = '1';
        skillParagraphs[count + 3].style.transform = 'translateX(0) translateY(-50%)';
        skillParagraphs[count + 2].style.opacity = '0';
        skillParagraphs[count + 2].style.transform = 'translateX(10em)';
    }
    if (e.target === leftArrow) {
        if (count === 3) {
            skillParagraphs[0].style.opacity = '0';
            skillParagraphs[0].style.transform = 'translateX(10em)';
        }
        skillParagraphs[count + 3].style.opacity = '1';
        skillParagraphs[count + 3].style.transform = 'translateX(0) translateY(-50%)';
        skillParagraphs[count + 4].style.opacity = '0';
        skillParagraphs[count + 4].style.transform = 'translateX(10em)';
    }
}

rightArrow.addEventListener('click', slider);
leftArrow.addEventListener('click', slider);

const sliderMobile = () => {
    if (start > move) {
        count++;
        skillParent.style.transition = '250ms ease-in-out';
        skillParent.style.transform = `translateX(${-width * count}px)`;
        skillIcons[count + 3].style.opacity = '0';
        skillIcons[count + 4].style.opacity = '1';
    }
    if (start < move) {
        count--;
        skillParent.style.transition = '250ms ease-in-out';
        skillParent.style.transform = `translateX(${-width * count}px)`;
        skillIcons[count + 5].style.opacity = '0';
        skillIcons[count + 4].style.opacity = '1';
    }

    if (count === -4) {
        count = 3;
        skillParent.addEventListener('transitionend', () => {
            skillParent.style.transition = 'none';
            skillParent.style.transform = `translateX(${(-width * count)}px)`;
            if (count === 3) {
                skillIcons[count + 4].style.opacity = '1';
            }
        });
    }
    if (count === 4) {
        count = -3;
        skillParent.addEventListener('transitionend', () => {
            skillParent.style.transition = 'none';
            skillParent.style.transform = `translateX(${-width * count}px)`;
            if (count === -3) {
                skillIcons[1].style.opacity = '1';
            }
        });
    }
}

skillParent.addEventListener('touchstart', (e) => {
    start = e.touches[0].clientX;
});
skillParent.addEventListener('touchmove', (e) => {
    move = e.touches[0].clientX;
});
skillParent.addEventListener('touchend', sliderMobile);


// handling eventlisteners and scroll function calling
const scroll = () => {
    let scrollY = window.scrollY;
    navIndicate(navItemsArr);
    if (scrollY < vh) {
        circleScale();
    }
    if (scrollY > vh) {
        scaleScroll();
    }
};

window.onload = () => {
    circleScale();
    introTextSlide();
    highlightName();
    navIndicate(navItemsArr);
    displayIcons();
}
window.addEventListener('scroll', scroll);
window.addEventListener('resize', navlistSwitch);
agoraButton.addEventListener('click', chatDisplay);
closeChatBox.addEventListener('click', chatDisplay);
