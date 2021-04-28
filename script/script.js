(function() {
    const carousel = document.querySelector('.js-carousel'),
        imagesContainer = document.querySelector('.js-carousel__images'),
        carouselArrowLeft = document.querySelector('.js-carousel__arrow-left'),
        carouselArrowRight = document.querySelector('.js-carousel__arrow-right'),
        carouselIndicators = document.querySelectorAll('.js-carousel__dot'),
        images = document.querySelectorAll('.js-carousel__image');

    let numberOfImages = images[0] ? images.length - 1 : null,
        carouselWidth = carousel ? carousel.offsetWidth : null,
        slideIndex = 0;

    window.addEventListener('resize', () => {
        if(carousel) {
            carouselWidth = carousel.offsetWidth;
        }
    });

    document.body.addEventListener('click', e => {
        const target = e.target;
        if(carouselIndicators) {
            if(target.classList.contains('js-carousel__dot')) {

                if(target.getAttribute('data-id')){
                    slideIndex = parseInt(target.getAttribute('data-id'));
                    resetSlideInterval();
                }
        
                slideToIndex(slideIndex);
            }
        }
    });


    /*
        Slides carousel to specific index
        @param index - index to which carousel should slide
    */
    const slideToIndex = (index) => {
        if(carouselIndicators) {
            carouselIndicators.forEach(indicator => {
                indicator.classList.remove('active');
            });
    
            if(carouselIndicators[index]) {
                carouselIndicators[index].classList.add('active');
            }
    
            imagesContainer.style.transform = `translateX(${index * -carouselWidth}px)`;
        }
    }

    /* 
        Moves carousel to the left and shows next picture
    */
    const slideLeft = () => {
        if(carouselArrowRight && imagesContainer && carouselIndicators) {
            resetSlideInterval();
            slideIndex = slideIndex + 1;

            if(numberOfImages) {
                slideIndex > numberOfImages ? slideIndex = 0 : slideIndex;
            }
    
            slideToIndex(slideIndex);
        }
    }

    carouselArrowRight.addEventListener('click', slideLeft);

    let slideInterval = setInterval(slideLeft, 4000);

    /*
        Starts slider interval from the beginning
    */
    function resetSlideInterval() {
        window.clearInterval(slideInterval);
        slideInterval = setInterval(slideLeft, 4000);
    }

    /* 
        Moves carousel to the right and shows next picture
    */
    const slideRight = () => {
        if(carouselArrowRight && imagesContainer && carouselIndicators) {
            resetSlideInterval();
            slideIndex = slideIndex - 1;

            if(numberOfImages) {
                slideIndex < 0 ? slideIndex = numberOfImages : slideIndex;
            }
    
            slideToIndex(slideIndex);
        }
    }

    carouselArrowLeft.addEventListener('click', slideRight);
})();