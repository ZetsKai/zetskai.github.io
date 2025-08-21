import { defineCustomElement } from "../../../../../utils/defineCustomElement.js";
import { hostResets } from "../../../../../assets/style/hostResets.js";
import './ScoreFav.js';
import { store } from "../../../../../utils/store.js";

const style = /*css*/`
    ${hostResets}

     :host {
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        min-height: 0;
        flex-basis: 100%;
        flex-grow: 1;
        padding: var(--spacing-xl);
    }

    .image {
        max-width: 100%;
        max-height: 100%;
        border-radius: 8px;
        border: 1px solid var(--border);
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <img class="image" src="https://static1.e926.net/data/6e/13/6e136ee7dbe6c1c15740ff4be5496c33.jpg" alt="" />
    <score-fav class="score-fav"></score-fav>

    <style>${style}</style>
`;

export class ImageContainer extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));
    }

    connectedCallback() {
	    let oldFingerPosY;

        this.shadowRoot.querySelector('.image').src = store.selectedPost.file.url

        const cancelSelect = e => {
            e.preventDefault();
            return false;
        }

        this.addEventListener('click', () => {
            const fullscreenEvent = new CustomEvent('fullscreen', {
                bubbles: true,
                composed: true
            });
            this.dispatchEvent(fullscreenEvent);
        });

        this.addEventListener('touchstart', (e) => {
            document.addEventListener('selectstart', cancelSelect)
            oldFingerPosY = e.touches[0].screenY;
        });

	    this.addEventListener('touchmove', (e) => {
	    	const currentFingerPosY = e.touches[0].screenY;
	    	const fingerPosCalculation = oldFingerPosY - (currentFingerPosY);

	    	oldFingerPosY = currentFingerPosY;

            const submenuMoveEvent = new CustomEvent('submenuMove', {
                bubbles: true,
                composed: true,
                detail: fingerPosCalculation
            });
            this.dispatchEvent(submenuMoveEvent);
	    }, { passive: true });

	    this.addEventListener('touchend', () => {
            document.removeEventListener('selectstart', cancelSelect);

            const submenuDropEvent = new CustomEvent('submenuDrop', {
                bubbles: true,
                composed: true
            });
            this.dispatchEvent(submenuDropEvent);
	    }, { passive: true });
    }

    disconnectedCallback() {}
}
defineCustomElement('image-container', ImageContainer);
