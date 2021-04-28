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
                carouselIndicators.forEach(indicator => {
                    indicator.classList.remove('active');
                });

                if(target.getAttribute('data-id')){
                    carouselIndicators[target.getAttribute('data-id')].classList.add('active');
                    slideIndex = parseInt(target.getAttribute('data-id'));
                    resetSlideInterval();
                }
                
        
                imagesContainer.style.transform = `translateX(${target.getAttribute('data-id') * -carouselWidth}px)`;
            }
        }
    });

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
    
            carouselIndicators.forEach(indicator => {
                indicator.classList.remove('active');
            });
            carouselIndicators[slideIndex].classList.add('active');
    
            imagesContainer.style.transform = `translateX(${slideIndex * -carouselWidth}px)`;
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
    
            carouselIndicators.forEach(indicator => {
                indicator.classList.remove('active');
            });
            carouselIndicators[slideIndex].classList.add('active');
    
            imagesContainer.style.transform = `translateX(${slideIndex * -carouselWidth}px)`;
        }
    }

    carouselArrowLeft.addEventListener('click', slideRight);
})();