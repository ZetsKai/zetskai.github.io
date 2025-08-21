import { hostResets } from '../../../../assets/style/hostResets.js';
import { defineCustomElement } from '../../../../utils/defineCustomElement.js';
import { store } from '../../../../utils/store.js';
import './components/ImageContainer.js';
import './components/Submenu.js';

const style = /*css*/`
    ${hostResets}

    :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background-color: var(--inset-surface);
    }

    .header {
        display: flex;
        overflow: hidden;
        justify-content: space-between;
        align-items: center;
        min-height: 0;
        flex-shrink: 0;
        padding: var(--spacing-xl);
        background-color: var(--surface);
        border-bottom: 1px solid var(--border);
        color: var(--icon);
    }

    .header__exit, .header__info-btn {
        background-color: transparent;
        border: unset;
        color: inherit;
    }

    .header__id {
        min-width: 0;
        flex-shrink: 1;
    }

    :host(.full-view--fullscreen) {
        background-color: black;

        .header {
            flex-basis: 0;
            padding: 0;
        }

        .image-container {
            padding: 0;
        }

        .image-container__image {
            border-radius: unset;
            border: unset;
        }

        .score-fav {
            display: none;
        }

        .submenu {
            padding: 0;
        }
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <div class="header">
        <button class="header__exit">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
                <!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
                <path d="m9.88 12.71-4.95 4.95 1.41 1.41 2.83-2.83L12 13.41l2.12 2.13 3.54 3.53 1.41-1.41-4.95-4.95-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12z"></path>
            </svg>
        </button>
        <div class="header__id">
            <span class="header__id-logo" style="font-weight: bolder;">ID</span>
            <span class="header__id-num">99999</span>
        </div>
        <button class="header__info-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
                <!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
                <path d="M12 22c5.51 0 10-4.49 10-10S17.51 2 12 2 2 6.49 2 12s4.49 10 10 10M11 7h2v2h-2zm0 4h2v6h-2z"></path>
            </svg>
        </button>
    </div>
    <image-container class="image-container"></image-container>
    <sub-menu></sub-menu>

    <style>${style}</style>
`;

export class FullView extends HTMLElement {
    #submenu;
    #postData

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));
    }

    connectedCallback() {
	    this.#submenu = this.shadowRoot.querySelector('sub-menu');
        
        this.#postData = store.selectedPost
        this.shadowRoot.querySelector('.header__id-num').innerHTML = this.#postData.id;
        
        this.addEventListener('fullscreen', this.#fullscreen.bind(this));
        this.addEventListener('submenuMove', this.#handleSubmemuHeight);
        this.addEventListener('submenuDrop', this.#handleSubmenuDrop);

	    this.shadowRoot.querySelector('.header__exit').addEventListener('click', () => history.back());
    }

    disconnectedCallback() {
        this.removeEventListener('fullscreen', this.#fullscreen.bind(this));
        this.removeEventListener('submenuMove', this.#handleSubmemuHeight);
        this.removeEventListener('submenuDrop', this.#handleSubmenuDrop);
    }

    #fullscreen() {
        this.classList.toggle('full-view--fullscreen');
        this.#submenu.classList.remove('submenu--open');
        this.#submenu.style.height = '0%';

        const shittySafariForceRepaint = () => {
            this.style.display = 'none';
            this.offsetHeight;
            this.style.display = 'flex';
        }

        // const chrome = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36';
        // const arc    = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36';
        // const edge   = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36 Edg/139.0.0.0';
        // const opera  = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 OPR/120.0.0.0s';
        // const safari = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1';

        const isSafari = /iPhone/i.test(navigator.userAgent);
        if (isSafari)
            requestAnimationFrame(shittySafariForceRepaint);
    }

    #handleSubmemuHeight(fingerPostCalculationInEventDetail) { this.#submenu.setHeight(fingerPostCalculationInEventDetail.detail); };
    #handleSubmenuDrop() { this.#submenu.setHeight(); };

}
defineCustomElement('full-view', FullView);
