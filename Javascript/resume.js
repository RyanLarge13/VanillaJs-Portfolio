// going into script for Resume section
const vh = document.querySelector('.intro-container').clientHeight;
const skillParent = document.querySelector('.skill-parent');
const skillIcons = document.querySelectorAll('.skill-icon');
const leftArrow = document.querySelector('.fa-caret-left');
const rightArrow = document.querySelector('.fa-caret-right');
let count = 0;
let width = skillIcons[0].clientWidth * 2;
let start;
let move;
const skillParagraphs = document.querySelectorAll('.skill-detail p');

export const displayIcons = () => {
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
};

const paraSliderMobile = () => {
    if (start > move) {
        if (count === -3) {
            skillParagraphs[skillParagraphs.length - 1].style.opacity = '0';
            skillParagraphs[skillParagraphs.length - 1].style.transform = 'translateX(10em)';
        }
        skillParagraphs[count + 3].style.opacity = '1';
        skillParagraphs[count + 3].style.transform = 'translateX(0) translateY(-50%)';
        skillParagraphs[count + 2].style.opacity = '0';
        skillParagraphs[count + 2].style.transform = 'translateX(10em)';
    }
    if (start < move) {
        if (count === 3) {
            skillParagraphs[0].style.opacity = '0';
            skillParagraphs[0].style.transform = 'translateX(10em)';
        }
        skillParagraphs[count + 3].style.opacity = '1';
        skillParagraphs[count + 3].style.transform = 'translateX(0) translateY(-50%)';
        skillParagraphs[count + 4].style.opacity = '0';
        skillParagraphs[count + 4].style.transform = 'translateX(10em)';
    }
};

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
    paraSliderMobile();
};

//resume skills section scroll function
export const skillsDisplay = () => {
    let height = vh - (vh / 2);
    let resumeContainer = document.querySelector('.resume-container');
    let carets = document.querySelectorAll('.caret');
    if (scrollY > height) {
        resumeContainer.style.transition = 'all 1s ease-in-out'
        resumeContainer.style.transform = 'translateX(0)';
        resumeContainer.style.opacity = '1';
        carets.forEach((caret) => {
            caret.style.opacity = '1';
        });
    } 
};

rightArrow.addEventListener('click', slider);
leftArrow.addEventListener('click', slider);

//mobile event listeners
skillParent.addEventListener('touchstart', (e) => {
    start = e.touches[0].clientX;
});
skillParent.addEventListener('touchmove', (e) => {
    move = e.touches[0].clientX;
});
skillParent.addEventListener('touchend', sliderMobile);