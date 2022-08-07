const sideBarIcons = document.querySelectorAll('.side-bar i');
const rlLogo = document.querySelector('.side-bar p');
const infoSections = document.querySelectorAll('.info-grid-container div');
const photo = document.querySelector('.photo-and-social');
const photoIcons = document.querySelectorAll('.photo-and-social i');

sideBarIcons[0].style.color = '#ffe259';
infoSections[0].style.display = 'block';
infoSections[0].style.opacity = '1';

export const scrollAbout = () => {
    rlLogo.style.opacity = '1';
    for (let k = 0; k < photoIcons.length; k++) {
        setTimeout(() => {
            photoIcons[k].style.transform = 'translateX(0)';
        }, 250 * k);
    }
    for (let k = 0; k < sideBarIcons.length; k++) {
        setTimeout(() => {
            setTimeout(() => {
                sideBarIcons[k].style.transform = 'translateX(0)';
            }, 100 * k);            
        }, 750);
    }
};

const color = () => {
    sideBarIcons.forEach((icon) => {
        icon.style.color = '#000';
    });
};

const pullUpInfo = (className) => {
    for (let k = 0; k < infoSections.length; k++) {
        if (infoSections[k].id === className) {
            infoSections[k].style.display = 'block';             
            setTimeout(() => {
                infoSections[k].style.opacity = '1';
            }, 250);
        } else {
            infoSections[k].style.opacity = '0';
            setTimeout(() => {
                infoSections[k].style.display = 'none';
            }, 250);
        }
    }
};

sideBarIcons.forEach((icon) => {
    icon.addEventListener('click', () => {
        color();
        icon.style.color = '#ffe259';
        const className = icon.className;
        pullUpInfo(className);
    });
});
