import { hostResets } from '../../../../assets/style/hostResets.js';
import { defineCustomElement } from '../../../../utils/defineCustomElement.js';
import { store } from '../../../../utils/store.js';
import './components/ImageContainer.js';
import './components/ScoreFav.js';
import './components/Submenu.js';

const style = /*css*/`
    ${hostResets}

    :host {
        display: none;
        z-index; 99;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background-color: var(--background);
    }

    :host([open]) {
        display: flex;
    }

    .link-dump { display: none !important; }

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

    :host([fullscreen]) {
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
    <image-container class="image-container">
        <score-fav class="score-fav" score="00k+" slot="score-fav"></score-fav>
    </image-container>
    <sub-menu></sub-menu>

    <style>${style}</style>
`;

export class FullView extends HTMLElement {
    #root;
    #elems = {}; // header, imageContainer, scoreFav, subMenu
    // #state = {}; // postsData, selectedPost
    #postsData = {};

    constructor() {
        super();

        this.#root = this.attachShadow({ mode: 'closed' });
        this.#root.append(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['open', 'fullscreen']
    }

    connectedCallback() {
        this.#elems.header = this.#root.querySelector('.header');
	    this.#elems.imageContainer = this.#root.querySelector('image-container');
	    this.#elems.scoreFav = this.#root.querySelector('score-fav');
	    this.#elems.submenu = this.#root.querySelector('sub-menu');
        
        this.addEventListener('selectPost', (e) => this.#setUiElems(e.detail));
        this.addEventListener('fullscreen', () => this.toggleAttribute('fullscreen'));
        this.addEventListener('submenuMove', this.#handleSubmemuHeight);
        this.addEventListener('submenuDrop', this.#handleSubmenuDrop);
	    this.#elems.header.querySelector('.header__exit').addEventListener('click', this.#closeFullView.bind(this));
    }

    disconnectedCallback() {
        this.addEventListener('selectPost', (e) => this.#setUiElems(e.detail));
        this.removeEventListener('fullscreen', this.#fullscreen.bind(this));
        this.removeEventListener('submenuMove', this.#handleSubmemuHeight);
        this.removeEventListener('submenuDrop', this.#handleSubmenuDrop);
	    this.#elems.header.querySelector('.header__exit').removeEventListener('click', this.#closeFullView.bind(this));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'fullscreen') this.#fullscreen();
    }

    set postsData(data) {
        this.#postsData = data;
    };

    openFullView(postIndex) {
        this.setAttribute('open', '');

        this.#elems.imageContainer.setSlider(this.#postsData);
        this.#elems.imageContainer.scrollToX(postIndex);

        this.#setUiElems(postIndex);
    }

    #closeFullView() {
        this.removeAttribute('open');
        this.removeAttribute('fullscreen');
        this.#elems.imageContainer.scrollToX(0);
        this.#elems.submenu.tempReset();
    };

    #setUiElems(postIndex) {
        if (postIndex == null) return;
        const post = this.#postsData[postIndex];
        console.log(post)
        
        this.#elems.header.querySelector('.header__id').innerHTML = post.id
        this.#elems.scoreFav.setAttribute('score', post.score.total);
        this.#elems.submenu.setAttribute('url', post.file.url);
        this.#elems.submenu.setAttribute('id', post.id);
        this.#elems.submenu.setAttribute('ext', post.file.ext);
    }

    #fullscreen() {
        this.#elems.submenu.classList.remove('submenu--open');
        this.#elems.submenu.style.height = '0%';

        const shittySafariForceRepaint = () => {
            this.style.display = 'none';
            this.offsetHeight;
            this.style = null;
        }

        // const chrome = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36';
        // const arc    = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36';
        // const edge   = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36 Edg/139.0.0.0';
        // const opera  = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 OPR/120.0.0.0s';
        // const safari = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1';

        const isSafari = /iPhone/i.test(navigator.userAgent);
        if (isSafari)
            requestAnimationFrame(shittySafariForceRepaint);

        const fullScreenEvent = new CustomEvent('full-view-fullScreen', {
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(fullScreenEvent);
    }

    #handleSubmemuHeight(fingerPostCalculationInEventDetail) {
        this.#elems.submenu.setHeight(fingerPostCalculationInEventDetail.detail);
    };
    #handleSubmenuDrop() {
        this.#elems.submenu.setHeight();
    };

}
defineCustomElement('full-view', FullView);
