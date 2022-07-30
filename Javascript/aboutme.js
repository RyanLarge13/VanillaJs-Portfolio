const sideBarIcons = document.querySelectorAll('.side-bar i');
const infoSections = document.querySelectorAll('.info-grid-container div');

sideBarIcons[0].style.color = '#ffe259';
infoSections[0].style.display = 'block';
infoSections[0].style.opacity = '1';

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
