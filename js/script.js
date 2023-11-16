let swiperInstance;

function widthResize() {
    const breakpoints = {};
    let slidesPerViewValue = 1.12;
    const startWidth = 320;
    const endWidth = 767;
    const incrementPerWidth = 0.00383;

    for (let width = startWidth; width <= endWidth; width += 1) {
        breakpoints[width] = {
            slidesPerView: slidesPerViewValue,
        };
        slidesPerViewValue += incrementPerWidth;
    }

    return breakpoints;
}

function initSwiper() {
    if (!swiperInstance) {
        const breakpoints = widthResize();
        swiperInstance = new Swiper('.image-slider', {
            slidesPerView: 1.12,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
            },
            breakpoints: breakpoints,
        });
    }
}

function destroySwiper() {
    if (swiperInstance) {
        swiperInstance.destroy(true, true);
        swiperInstance = null;
    }
}

function handleResize() {
    if (window.innerWidth <= 768) {
        initSwiper();
    } else {
        destroySwiper();
    }
}

handleResize();
window.addEventListener('resize', handleResize);

const toggleButton = document.getElementById('showMore');
const toggleButtonText = document.getElementById('showMoreText');
const toggleButtonImg = document.getElementById('showMoreImg');
const listItems = document.querySelectorAll('.image-slider__slide');

let showAll = false;

function applyListVisibility() {
    const width = window.innerWidth;
    for (let i = 0; i < listItems.length; i++) {
        if (showAll) {
            listItems[i].style.display = 'inline-flex';
        } else {
            if (width >= 1120 && i < 8) {
                listItems[i].style.display = 'inline-flex';
            } else if (width >= 768 && i < 6) {
                listItems[i].style.display = 'inline-flex';
            } else if (width >= 768 && i >= 6 || width >= 1120 && i >= 8) {
                listItems[i].style.display = 'none';
            } else {
                listItems[i].style.display = 'inline-flex';
            }
        }
    }
}

function initializeListVisibility() {
    showAll = false;
    applyListVisibility();
}

initializeListVisibility();

toggleButton.addEventListener('click', function () {
    showAll = !showAll;
    toggleButtonText.textContent = showAll ? 'Скрыть' : 'Показать все';
    toggleButtonImg.classList.toggle('image-rotated');

    applyListVisibility();
});

window.addEventListener('resize', initializeListVisibility);
