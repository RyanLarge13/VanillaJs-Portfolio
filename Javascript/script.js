import { chatDisplay } from './agoraRTM.js';
import { skillsDisplay, displayIcons } from './resume.js';

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

// implementing a button that will take you to the top of the page
const toTopBtn = document.querySelector('.to-top-btn');
toTopBtn.style.transition = '750ms ease-in-out';
const toTop = () => {
    if (scrollY > vh / 2) {
        toTopBtn.style.opacity = '1';
        toTopBtn.style.pointerEvents = 'unset';
    } else {
        toTopBtn.style.opacity = '0';
        toTopBtn.style.pointerEvents = 'none';
    }
};

toTopBtn.addEventListener('click', () => {
    window.scrollTo(0, 0);
    if (nav.classList.contains('transform-scale')) {
        navDisplay();
    }
});

// handling eventlisteners and scroll function calling
const scroll = () => {
    let scrollY = window.scrollY;
    navIndicate(navItemsArr);
    skillsDisplay();
    if (scrollY < vh) {
        circleScale();
        toTop();
    }
    if (scrollY > vh) {
        scaleScroll();
        toTop();
    }
};

window.onload = () => {
    circleScale();
    introTextSlide();
    highlightName();
    navIndicate(navItemsArr);
    displayIcons();
    toTop();
}
window.addEventListener('scroll', scroll);
window.addEventListener('resize', navlistSwitch);
agoraButton.addEventListener('click', chatDisplay);
closeChatBox.addEventListener('click', chatDisplay);
