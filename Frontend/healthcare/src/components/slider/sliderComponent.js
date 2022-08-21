import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

import './style.css';

/* It takes an array of images and creates a carousel out of them. */
class sliderElement extends HTMLElement {
	constructor() {
		super();
		this.images = [
			'https://amadag.com/wp-content/uploads/2018/09/pastillas.jpg',
			'https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2021/04/myriam-zilles-kltolk6mk-g-unsplash-scaled.jpeg?fit=1200%2C741&quality=50&strip=all&ssl=1',
			'https://album.mediaset.es/eimg/2022/07/04/pastillas-anticovid_45b1.jpg',
			'https://www.xlsemanal.com/wp-content/uploads/sites/3/2017/07/pastillas-cuchara.jpg',
		];
		/* Taking the images array and mapping it to the ListCarousel function. */
		this.carousel = (this.images || []).map(this.ListCarousel).join('\n');
	}
	/**
	 * It takes an image and returns a list item with the image as the source.
	 * @param img - The image to be displayed in the carousel.
	 * @returns A string of HTML code.
	 */
	ListCarousel(img) {
		return `<li class="splide__slide"><img src="${img}" class="slider__item"></li>`;
	}
	/**
	 * The function above is a custom element that takes in a list of images and creates a carousel out of
	 * them.
	 */
	connectedCallback() {
		this.innerHTML = `
        <section class="splide" aria-labelledby="carousel-heading">
            <div class="splide__track">
                <ul class="splide__list">
                    ${this.carousel}
                </ul>
            </div>
        </section>`;
		new Splide('.splide', {
			fixedHeight: '20rem',
		}).mount();
	}
}

customElements.define('slider-element', sliderElement);
