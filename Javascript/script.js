import { chatDisplay, chatBox } from './agoraRTM.js';
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
const hiddenMenu = document.querySelector('.hidden-menu');
const dragLine = document.querySelector('.drag-line');
const main = document.querySelector('main');
let navItemsArr = Array.from(navListItems);
let screenWidth = window.innerWidth;
let newScroll;
let menuTime;

export const menuListen = (e) => {
    e.preventDefault();
    menuTime = false;
    let time = setTimeout(() => {
        menuTime = true;
        if (e.touches > 1) {
            if (hiddenMenu.style.top === '65%') {
                return;
            }
            menuOpen();
        } else {
            menuTime = false;
            return clearTimeout(time);
        }
    }, 1500);
    window.addEventListener('touchend', () => {
        if (menuTime === false) {
            clearTimeout(time);
        }
    });
};

const menuOpen = () => {
    window.navigator.vibrate(50);
    hiddenMenu.style.transition = '250ms ease-in-out';
    hiddenMenu.style.top = '65%';
};

dragLine.addEventListener('touchmove', (e) => {
    e.preventDefault();
    let top = e.touches[0].clientY;
    console.log(top)
    if (top > 550 && top < 700) {
        hiddenMenu.style.transition = 'none';
        hiddenMenu.style.top = `${top}px`;
    }
    else if (top <= 550) {
        return;
    } 
    else if (top >= 700) {
        hiddenMenu.style.transition = '250ms ease-in-out';
        window.navigator.vibrate(50);
        return hiddenMenu.style.top = `${top + 400}px`;
    }
});

const hideNav = (prevScroll) => {
    setTimeout(() => {
        newScroll = window.scrollY;
    }, 10);
    if (prevScroll > newScroll) {
        nav.style.transition = '500ms ease-in-out';
        nav.style.opacity = '0';
    } else {
        nav.style.transition = '500ms ease-in-out';
        nav.style.opacity = '1';
    }
};

const hideNavMobile = (prevScroll) => {
    setTimeout(() => {
        newScroll = window.scrollY;
    }, 10);
    if (prevScroll > newScroll) {
        nav.style.transition = '500ms ease-in-out';
        nav.style.opacity = '0';
        setTimeout(() => {
            if (nav.style.opacity === '0') {
                nav.style.opacity = '.001';
            } else {
                nav.style.opacity = '1';
            }
        }, 1000);
    } else {
        nav.style.transition = '500ms ease-in-out';
        nav.style.opacity = '1';
    }
};

const welcomeMessage = () => {
    let messageContainer = document.querySelector('.intro-logo');
    let message = document.querySelector('.intro-logo-text');
    messageContainer.style.transition = '500ms ease-in-out';
    message.style.transition = '500ms ease-in-out';
    setTimeout(() => {
        message.style.opacity = '1';
    }, 500);
    setTimeout(() => {
        messageContainer.style.opacity = '0';
    }, 2000);  
    setTimeout(() => {
        messageContainer.style.display = 'none';
    }, 2500);  
};

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
    nav.style.transition = 'transform 250ms ease-in-out';
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
    introCircles.forEach((circle, index, circleArr) => {
        circleArr[0].style.transition = 'transform 3s ease-in-out';
        circleArr[1].style.transition = 'transform 2s ease-in-out';
        circle.style.transform = 'scale(1)';
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
    introText.forEach((elem, index, elemArr) => {
        elemArr[0].style.transition = '1.5s ease-in-out';
        elemArr[1].style.transition = '1s ease-in-out';
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
    if (chatBox.classList.contains('scale')) {
        chatDisplay();
    }
});

// handling eventlisteners and scroll function calling
export const scroll = () => {
    let scrollY = window.scrollY;
    if (window.innerWidth > 1000) {
        hideNav(scrollY);
    }
    if (window.innerWidth < 1000) {
        hideNavMobile(scrollY);
    }
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
    welcomeMessage();
    setTimeout(() => {
        circleScale();
    introTextSlide();
    highlightName();
    navIndicate(navItemsArr);
    displayIcons();
    toTop();
    skillsDisplay();
    }, 2500);
};
window.addEventListener('scroll', scroll);
window.addEventListener('resize', navlistSwitch);
main.addEventListener('touchstart', menuListen, { passive: false });
agoraButton.addEventListener('click', () => {
    main.removeEventListener('touchstart', menuListen);
    chatDisplay();
});
closeChatBox.addEventListener('click', chatDisplay);