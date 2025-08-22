import { defineCustomElement } from "../../../../../utils/defineCustomElement.js";
import { hostResets } from "../../../../../assets/style/hostResets.js";
import './ScoreFav.js';
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
        scroll-snap-type: x mandatory
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
    <div class="slider">
        <div class="container">
            <img class="container__image" src="https://static1.e926.net/data/13/f3/13f3da299a8264d990e377f78af804d1.jpg" />
        </div>
        <div class="container">
            <img class="container__image" src="https://static1.e926.net/data/ca/11/ca118b47423bc71db86284f0741db497.jpg" />
        </div>
    </div>
    <score-fav class="score-fav" score="0"></score-fav>

    <style>${style}</style>
`;

const cancelSelect = e => {
    e.preventDefault();
    return false;
}

export class ImageContainer extends HTMLElement {
	#oldFingerPosY;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));
    }

    connectedCallback() {
        // store.loadedPosts.forEach(this.#addImg);
        // this.shadowRoot.querySelector('.container__image').src = store.selectedPost.file.url

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

    #addImg(postData) {
        const img = this.shadowRoot.createElement('img');
        img.src = postData.file.url;
        this.shadowRoot.append(img);
    }

    #handleFingerTap() {
        const fullscreenEvent = new CustomEvent('fullscreen', {
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(fullscreenEvent);
    }

    #handleFingerStart(e) {
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
    }
}
defineCustomElement('image-container', ImageContainer);
