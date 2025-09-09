import { defineCustomElement } from "../../../../../utils/defineCustomElement.js";
import { hostResets } from "../../../../../assets/style/hostResets.js";
import { store } from "../../../../../utils/store.js";

const style = /*css*/`
    ${hostResets}

     :host {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: stretch;
        min-height: 0;
        flex-basis: 100%;
        width: 100%;
        /* padding: var(--spacing-xl); */
        box-sizing: border-box;
        /* background-color: blue; */
    }

    .slider {
        display: flex;
        width: 100%;
        max-width: 100%;
        height: 100%;
        box-sizing: border-box;
        /* overflow-x: scroll; */
        overflow: hidden;
        /* scroll-snap-type: x mandatory; */
        /* scrollbar-width: none; */
    }

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        flex-basis: 100%;
        min-width: 100%;
        width: 100%;
        min-height: 0;
        max-height: 100%;
        /* scroll-snap-align: start; */
        padding-inline: 0.4px;
        /* background-color: green; */
        /* border-inline: 1px solid orange; */
        box-sizing: border-box;
    }

    .container__image {
        max-width: 100%;
        max-height: 100%;
        border-radius: 8px;
        box-sizing: border-box;
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
    #elems = {}; // slider
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
        this.#elems.slider = this.#root.querySelector('.slider');
        
        // this.#observer = new IntersectionObserver(entries => {
        //     if (entries.length > 1) { this.#observerEntries = [...entries] }
        //     const entry = entries[0];

        //     if (entry.isIntersecting) {
        //         this.#timeoutId = setTimeout(() => {
        //             const selectPostEvent = new CustomEvent('image-container-select-post', {
        //                 bubbles: true,
        //                 composed: true,
        //                 detail: this.#observerEntries.findIndex(elem => elem.target == entry.target)
        //             });
        //             this.dispatchEvent(selectPostEvent);
        //         }, 255);
        //     }
        //     else clearTimeout(this.#timeoutId);

        // },{ root: this.#elems.slider, threshold: 1.0 });

        this.addEventListener('click', this.#handleFingerTap);
        this.addEventListener('touchstart', this.#handleFingerStart);
	    // this.addEventListener('touchmove', this.#handleFingerMove, { passive: true });
	    this.addEventListener('touchend', this.#handleFingerDrop, { passive: true });
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.#handleFingerTap);
        this.removeEventListener('touchstart', this.#handleFingerStart);
	    this.removeEventListener('touchmove', this.#handleFingerMove, { passive: true });
	    this.removeEventListener('touchend', this.#handleFingerDrop, { passive: true });
    }

    scrollToX(postIndex) {
        const containerToScrollTo = this.#elems.slider.querySelectorAll('.container')[postIndex];

        containerToScrollTo.scrollIntoView({
            behavior: 'instant',
            container: 'nearest',
            block: 'nearest',
            inline: 'start'
        });

        // this.#elems.slider.scrollLeft = containerToScrollTo.offsetLeft;
    }

    setSlider(data) {
        const containerDiv = this.#root.ownerDocument.createElement('div');
        const imgElem = this.#root.ownerDocument.createElement('img');
        const vidElem = this.#root.ownerDocument.createElement('video');
        const sourceElem = this.#root.ownerDocument.createElement('source');

        containerDiv.classList.add('container');
        imgElem.classList.add('container__image');
        vidElem.classList.add('container__image');

        const posts = data.map(post => {
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
            // this.#observer.observe(media);

            return container;
        });
        this.#elems.slider.innerHTML = null;
        this.#elems.slider.append(...posts);
    }

    #handleFingerTap() {
        const fullscreenEvent = new CustomEvent('image-container-fullscreen', {
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

        const submenuMoveEvent = new CustomEvent('image-container-move-submenu', {
            bubbles: true,
            composed: true,
            detail: fingerPosCalculation
        });
        this.dispatchEvent(submenuMoveEvent)
    }

    #handleFingerDrop() {
        document.removeEventListener('selectstart', cancelSelect);

        const submenuDropEvent = new CustomEvent('image-container-submenu-drop', {
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(submenuDropEvent);
    }
}
defineCustomElement('image-container', ImageContainer);
