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
        overflow: hidden;
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
    #timeoutId;
    #observer;
    #observerEntries;

    constructor() {
        super();

        this.#root = this.attachShadow({ mode: 'closed' });
        this.#root.append(template.content.cloneNode(true));
    }


    connectedCallback() {
        // store.loadedPosts.forEach(this.#addImg);
        // this.#root.querySelector('.container__image').src = store.selectedPost.file.url
        this.#observer = new IntersectionObserver(entries => {
            if (entries.length > 1) { this.#observerEntries = [...entries] }
            const entry = entries[0];

            if (entry.isIntersecting) {
                this.#timeoutId = setTimeout(() => {
                    const selectPostEvent = new CustomEvent('selectPost', {
                        bubbles: true,
                        composed: true,
                        detail: this.#observerEntries.findIndex(elem => elem.target == entry.target)
                    });
                    this.dispatchEvent(selectPostEvent);
                }, 255);
            }
            else clearTimeout(this.#timeoutId);

        },{ root: this.#root.querySelector('.slider'), threshold: 1.0 });

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

    setPostsData(data) {
        const slider = this.#root.querySelector('.slider');
        const containerDiv = document.createElement('div');
        const imgElem = document.createElement('img');
        const vidElem = document.createElement('video');
        const sourceElem = document.createElement('source');

        containerDiv.classList.add('container');
        imgElem.classList.add('container__image');
        vidElem.classList.add('container__image');

        data.forEach(post => {
            const container = containerDiv.cloneNode(true);
            const source = sourceElem.cloneNode(true);
            let media;

            if (post.file.ext == 'webm' || post.file.ext == 'mp4') {
                media = vidElem.cloneNode(true);
                media.append(source);
                source.src = post.file.url;
                source.setAttribute('type', `video/${post.file.ext}`);
            }
            else {
                media = imgElem.cloneNode(true);
                media.src = post.file.url;
            }

            container.append(media);
            this.#observer.observe(container);
            slider.append(container);
        });

        const containers = slider.querySelectorAll('.container__image');
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
