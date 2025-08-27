import { defineCustomElement } from "../../../../../utils/defineCustomElement.js";
import { hostResets } from "../../../../../assets/style/hostResets.js";
import { store } from "../../../../../utils/store.js";

const style = /*css*/`
    ${hostResets}

     :host {
        position: relative;
        min-height: 0;
        flex-basis: 100%;
        flex-grow: 1;
        padding: var(--spacing-xl);
    }

    .slider {
        display: flex;
        width: 100%;
        height: 100%;
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
    }

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-basis: 100%;
        flex-shrink: 0;
        min-height: 0;
        max-height: 100%;
        scroll-snap-align: start;
    }

    .container__image {
        max-width: 100%;
        max-height: 100%;
        border-radius: 8px;
        border: 1px solid var(--border);
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <div class="slider"></div>
    <slot name="score-fav"></slot>

    <style>${style}</style>
`;

const cancelSelect = e => {
    e.preventDefault();
    return false;
}

export class ImageContainer extends HTMLElement {
    #root;
	#oldFingerPosY;
    #sliderPostIndex;
    #timeoutId;

    constructor() {
        super();

        this.#root = this.attachShadow({ mode: 'closed' });
        this.#root.append(template.content.cloneNode(true));
        this.#timeoutId = null;
    }

    connectedCallback() {
        // store.loadedPosts.forEach(this.#addImg);
        // this.#root.querySelector('.container__image').src = store.selectedPost.file.url

        this.#root.querySelector('.slider').addEventListener('scroll', this.#handleSliderScroll.bind(this));
        this.addEventListener('click', this.#handleFingerTap);
        this.addEventListener('touchstart', this.#handleFingerStart);
	    this.addEventListener('touchmove', this.#handleFingerMove, { passive: true });
	    this.addEventListener('touchend', this.#handleFingerDrop, { passive: true });
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.#handleFingerTap);
        this.removeEventListener('touchstart', this.#handleFingerStart);
	    this.removeEventListener('touchmove', this.#handleFingerMove, { passive: true });
	    this.removeEventListener('touchend', this.#handleFingerDrop, { passive: true });
    }

    scrollToX(postIndex) {
        const slider = this.#root.querySelector('.slider');
        slider.scrollLeft = slider.getBoundingClientRect().width * postIndex;
    }

     #handleSliderScroll(e) {
        const sliderContainer = e.target;
        this.#sliderPostIndex = sliderContainer.scrollLeft / sliderContainer.getBoundingClientRect().width;
    }

    setPostsData(data) {
        data.forEach(post => {
            const slider = this.#root.querySelector('.slider');
            const container = document.createElement('div');
            const img = document.createElement('img');

            container.classList.add('container');
            img.classList.add('container__image');
            img.src = post.file.url;

            container.append(img);
            slider.append(container);
        });
    }

    #handleFingerTap() {
        const fullscreenEvent = new CustomEvent('fullscreen', {
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(fullscreenEvent);
    }

    #handleFingerStart(e) {
        clearTimeout(this.#timeoutId)
        this.#timeoutId = null;

        document.addEventListener('selectstart', cancelSelect)
        this.#oldFingerPosY = e.touches[0].screenY;
    }

    #handleFingerMove(e) {
        const currentFingerPosY = e.touches[0].screenY;
	    const fingerPosCalculation = this.#oldFingerPosY - (currentFingerPosY);

	    this.#oldFingerPosY = currentFingerPosY;

        const submenuMoveEvent = new CustomEvent('submenuMove', {
            bubbles: true,
            composed: true,
            detail: fingerPosCalculation
        });
        this.dispatchEvent(submenuMoveEvent)
    }

    #handleFingerDrop() {
        document.removeEventListener('selectstart', cancelSelect);

        const submenuDropEvent = new CustomEvent('submenuDrop', {
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(submenuDropEvent);

        this.#timeoutId = setTimeout(() => {
            const selectPostEvent = new CustomEvent('selectPost', {
                bubbles: true,
                composed: true,
                detail: Math.ceil(this.#sliderPostIndex)
            });
            console.log(selectPostEvent.detail);
            this.dispatchEvent(selectPostEvent);
        }, 1000);
    }
}
defineCustomElement('image-container', ImageContainer);
