import { scroll } from "./script.js";

// going into script for Resume section
const vh = document.querySelector('.intro-container').clientHeight;
const skillContainer = document.querySelector('.resume-container');
const skillParent = document.querySelector('.skill-parent');
const skillIcons = document.querySelectorAll('.skill-icon');
const leftArrow = document.querySelector('.fa-caret-left');
const rightArrow = document.querySelector('.fa-caret-right');
const skillParagraphs = document.querySelectorAll('.skill-detail p');
const resumeSVGPaths = document.querySelectorAll('.res-svg path');
const resumeSVG = document.querySelector('.res-svg');
const width = skillIcons[0].clientWidth * 2;
let count = 0;
let start;
let move;

export const displayIcons = () => {
    skillIcons[4].style.opacity = '1';
    skillParagraphs[3].style.opacity = '1';
    skillParagraphs[3].style.transform = 'translateX(0) translateY(-50%)';
}

const dblTapSVG = () => {
    sectionTwoBody.removeEventListener('touchend', handleSVG);
    let arr = Array.from(resumeSVGPaths);
    resumeSVGPaths.forEach((path) => {
        if (path.style.transition === '500ms ease-in-out') {
            return;
        }
        path.style.transition = '500ms ease-in-out';
    });
    setTimeout(() => {
        arr[2].style.opacity = '1';
        setTimeout(() => {
            arr[2].style.perspective = '2em';
            arr[2].style.transform = 'rotateX(-25deg) translateY(15%)';
            arr[1].style.perspective = '2em';
            arr[1].style.transform = 'rotateX(-25deg) translateY(15%)';
            setTimeout(() => {
                arr[1].style.opacity = '1';
                arr[0].style.perspective = '2em';
                arr[0].style.transform = 'rotateX(-25deg) translateY(15%)';
                setTimeout(() => {
                    arr[0].style.opacity = '1';
                }, 200);
            }, 500);
        }, 200);
    }, 500);
    setTimeout(() => {
        arr[1].style.opacity = '0';
        arr[0].style.opacity = '0';
        arr[2].style.transform = 'rotateX(0)';
        setTimeout(() => {
            arr[2].style.transform = 'rotateX(25deg) translateY(15%)';
            setTimeout(() => {
                arr[1].style.opacity = '1';
                arr[0].style.opacity = '1';
            }, 300);
        }, 500);
    }, 1500);
    setTimeout(() => {
        resumeSVGPaths.forEach((path) => {
            path.style.opacity = '0';
            setTimeout(() => {
                path.style.display = 'none';
            }, 500);
        });
    }, 3000);
    setTimeout(() => {
        resumeSVG.style.display = 'none';
    }, 3500);
};

const slider = (e) => {
    skillIcons.forEach(icon => {
        icon.style.transition = '1s ease-in-out';
    });
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
    skillParagraphs.forEach(paragraph => {
        paragraph.style.transition = '1s ease-in-out';
    });
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
    skillParagraphs.forEach(paragraph => {
        paragraph.style.transition = '1s ease-in-out';
    });
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
    skillIcons.forEach(icon => {
        icon.style.transition = '1s ease-in-out';
    });
    if (start > move) {
        if ((start - move) < 75 || move === undefined) {
            return;
        }
        count++;
        skillParent.style.transition = '250ms ease-in-out';
        skillParent.style.transform = `translateX(${-width * count}px)`;
        skillIcons[count + 3].style.opacity = '0';
        skillIcons[count + 4].style.opacity = '1';
    }
    if (start < move) {
        if ((move - start) < 75 || move === undefined) {
            return;
        }
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
    move = undefined;
};

//resume skills section scroll function
export const skillsDisplay = () => {
    const skillData = document.querySelector('.skill-data');
    const height = vh - (vh / 2);
    const resumeContainer = document.querySelector('.resume-container');
    const carets = document.querySelectorAll('.caret');
    if (skillData !== null) {
        return;
    } // need to find a new condition that is more reliable
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
skillContainer.addEventListener('touchstart', (e) => {
    start = e.touches[0].clientX;
}, { passive: true });
skillContainer.addEventListener('touchmove', (e) => {
    move = e.touches[0].clientX;
}, { passive: true });
skillContainer.addEventListener('touchend', sliderMobile);

// goiung into the view more functionality
const sectionTwoBody = document.querySelector('.sec-2');

let showMoreSkills = (() => {
    const skillSection = document.querySelector('.sec-2');
    const backgroundBox = document.querySelector('.background-box');
    const skillContainer = document.querySelector('.resume-container');
    const carrets = document.querySelectorAll('.caret');

    const moveSkill = async (e) => {
        e.preventDefault();
        if (e.target === carrets[0] || e.target === carrets[1]) {
            return;
        }
        const obj = {
            'height': '100%',
            'left': '5%',
            'position': 'absolute',
            'flex-direction': 'column',
        }
        if (skillContainer.parentNode === backgroundBox) {
            return;
        }
        carrets.forEach((caret) => {
            caret.style.opacity = '0';
            setTimeout(() => {
                caret.style.display = 'none';
            }, 750);
        });
        skillContainer.style.opacity = '0';
        setTimeout(() => {
            backgroundBox.appendChild(skillContainer);
            Object.assign(skillContainer.style, obj);
            skillContainer.children.forEach((child, index, arr) => {
                arr[1].style.transform = 'translateX(5em)';
                child.style.width = '100%';
            });
            setTimeout(() => {
                skillContainer.style.opacity = '1';
            }, 100);
        }, 750);
    };

    const appendData = async () => {
        const data = document.createElement('div');
        data.classList.add('skill-data-pc');
        skillSection.appendChild(data);
        const returnObj = {
            'height': '50%',
            'position': 'relative',
            'flex-direction': 'row',
            'transform': 'translateX(-10%)',
        };

        data.addEventListener('dblclick', () => {
            window.removeEventListener('scroll', skillsDisplay);
            skillSection.removeChild(data);
            skillContainer.style.opacity = '0';
            setTimeout(() => {
                Object.assign(skillContainer.style, returnObj);
                carrets.forEach((caret) => {
                    caret.style.display = 'block';
                    setTimeout(() => {
                        caret.style.opacity = '1';
                    }, 500);
                });
                skillSection.insertBefore(skillContainer, carrets[1]);
                setTimeout(() => {
                    skillContainer.style.opacity = '1';
                }, 100);
            }, 750);
        });
    };

    const read = () => {
        
    };

    return {
        read: read,
        moveSkill: moveSkill,
        appendData: appendData,
    }
})();

sectionTwoBody.addEventListener('dblclick', (e) => {
    if (e.type === 'touch') {
        return;
    }
    showMoreSkills.moveSkill(e).then(() => {
        setTimeout(() => {
            showMoreSkills.appendData(); 
        }, 1250);
    });
});

// showMoreSkills.read();


//this section with contain functions specifically for mobile devices registering
// a double tap for the screen to view more information on skills

let moveMobileSkills = (() => {
    const backgroundBox = document.querySelector('.background-box');
    const skillContainer = document.querySelector('.resume-container');

    const moveMobileSkillContainer = async () => {
        backgroundBox.style.transition = '250ms ease-in-out';
        backgroundBox.style.transform = 'translateX(1em)';
        setTimeout(() => {
            backgroundBox.style.transition = '500ms';
            backgroundBox.style.transform = 'translateX(-15em)';
        }, 250);

        setTimeout(() => {
            skillContainer.style.transition = '250ms ease-in-out';
            skillContainer.style.transform = 'translateX(-20em)';
        }, 250);
    };

    const moveMobileSkillContainerBack = async (dataContainer) => {
        dataContainer.remove();
        skillContainer.style.transition = 'all 500ms ease-in-out'
        skillContainer.style.transform = 'translateX(0)';
        setTimeout(() => {
            backgroundBox.style.transition = '500ms ease-in-out';
            backgroundBox.style.transform = 'translateX(0)';
        }, 250);
    };

    //for fetching resume data from server once inplemented
    const bringInData = async () => {
        const theHelpMessage = document.querySelector('.help-message');
        theHelpMessage.style.opacity = '0';
        const dataContainer = document.createElement('div');
        dataContainer.className = 'skill-data';
        sectionTwoBody.appendChild(dataContainer);
        
        dataContainer.addEventListener('touchend', (e) => {
            doubleTap(e);
        });
    };

    const displayHelp = () => {
        const theHelpMessage = document.querySelector('.help-message');
        if (theHelpMessage === null) {
            const helpMessage = document.createElement('div');
            helpMessage.classList.add('help-message');
            helpMessage.innerHTML = 'double tap to view more about each skill';
            sectionTwoBody.appendChild(helpMessage);
            setTimeout(() => {
                helpMessage.style.opacity = '0';
            }, 4000)
        } else {
            return;
        }
    };


    return {
        moveMobileSkillContainer: moveMobileSkillContainer,
        moveMobileSkillContainerBack: moveMobileSkillContainerBack,
        bringInData: bringInData,
        displayHelp: displayHelp,
    }
})();

let lastTap = 0;
let timeout;

const doubleTap = async (e) => {
    e.preventDefault();
    const dataContainer = document.querySelector('.skill-data');
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;

    clearTimeout(timeout);

    if (tapLength < 250 && tapLength > 0) {
        if (e.target === sectionTwoBody) {
            window.removeEventListener('scroll', scroll);
            timeout = setTimeout(() => {
                moveMobileSkills.moveMobileSkillContainer().then(() => {
                    setTimeout(() => {
                        moveMobileSkills.bringInData().then(() => {
                            window.addEventListener('scroll', scroll);
                        });
                    }, 500);
                });
                clearTimeout(timeout);
            }, 500);
        }
        if (e.target === dataContainer) {
            timeout = setTimeout(() => {
                moveMobileSkills.moveMobileSkillContainerBack(dataContainer).then(() => {
                    setTimeout(() => {

                    }, 500);
                });
                clearTimeout(timeout);
            }, 500);
        }
    } else {
        moveMobileSkills.displayHelp();
    }
    lastTap = currentTime;
};

const handleDblTouch = (e) => {
    if (e.target !== sectionTwoBody) {
        return;
    } else {
        doubleTap(e);
    }
};

const handleSVG = () => {
    dblTapSVG();
};

sectionTwoBody.addEventListener('touchend', handleDblTouch);
sectionTwoBody.addEventListener('touchend', handleSVG);