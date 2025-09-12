import { defineCustomElement } from "../../../../../utils/defineCustomElement.js";
import { hostResets } from "../../../../../assets/style/hostResets.js";

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
		/**
  		 * ! - For some reason this breaks the scrolling in iOS.
  		 *	Also, when setting the padding to 0 from "FullView.js".
	 	 *	it makes this move to the left.
	 	**/
   		/* TODO - Fix this so we can have padding when not in fullscren mode. */
        /* padding: var(--spacing-xl); */
        box-sizing: border-box;
    }

    .slider {
        display: flex;
        width: 100%;
        max-width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;

        &[scroll-disabled] {
            overflow-x: hidden;
        }
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
        scroll-snap-align: start;
        padding-inline: 0.4px;
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

    #initialFingerPosition;
	#storedFingerPositionY;

    #observer = {
        timeoutId: null,
        intersectionObserver: null,
        entries: null
    }

    constructor() {
        super();

        this.#root = this.attachShadow({ mode: 'closed' });
        this.#root.append(template.content.cloneNode(true));
    }


    connectedCallback() {
        this.#elems.slider = this.#root.querySelector('.slider');
        
        this.#observer.intersectionObserver = new IntersectionObserver(entries => {
            if (entries.length > 1) { this.#observer.entries = [...entries] }
            const entry = entries[0];

            if (entry.isIntersecting) {
                this.#observer.timeoutId = setTimeout(() => {
                    const selectPostEvent = new CustomEvent('image-container-select-post', {
                        bubbles: true,
                        composed: true,
                        detail: this.#observer.entries.findIndex(elem => elem.target == entry.target)
                    });
                    this.dispatchEvent(selectPostEvent);
                }, 255);
            }
            else clearTimeout(this.#observer.timeoutId);
        }, { root: this.#elems.slider, threshold: 1.0 });

        this.addEventListener('click', this.#handleFingerTap);
        this.addEventListener('touchstart', this.#handleFingerStart);    
	    this.addEventListener('touchend', this.#handleFingerDrop);
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.#handleFingerTap);
        this.removeEventListener('touchstart', this.#handleFingerStart);
	    this.removeEventListener('touchend', this.#handleFingerDrop);
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
                media.setAttribute('loading', 'lazy');
            }
            container.append(media);
            this.#observer.intersectionObserver.observe(media);
            // media.addEventListener('load', () => console.log(container));

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

    #handleFingerStart(touchEvent) {
        this.#root.ownerDocument.addEventListener('selectstart', cancelSelect)
        this.#initialFingerPosition = touchEvent.touches[0];
        this.#storedFingerPositionY = this.#initialFingerPosition.screenY;
        this.addEventListener('touchmove', this.#checkForFingerDirection);
    }

    #checkForFingerDirection(touchEvent) {
        const firstMovePosData = touchEvent.touches[0];

        const calculatedPos = {
            x: Math.abs(this.#initialFingerPosition.screenX - firstMovePosData.screenX),
            y: this.#initialFingerPosition.screenY - firstMovePosData.screenY
        }

        const isFingerMovingHorizontally = calculatedPos.x > Math.abs(calculatedPos.y);
        const isFingerMovingDown = calculatedPos.y < 0;

        if (isFingerMovingHorizontally);
        else if (isFingerMovingDown) {
            this.addEventListener('touchmove', this.#moveFullviewMenu, { passive: true });
            console.log('down');
        }
        else {
            console.log('up');
            this.#elems.slider.setAttribute('scroll-disabled', '');
            this.addEventListener('touchmove', this.#moveSubmenu, { passive: true })
        }

	    this.removeEventListener('touchmove', this.#checkForFingerDirection);
    }

    #moveFullviewMenu(touchEvent) {
        const currentFingerPosY = touchEvent.touches[0].screenY;
	    const fingerPosCalculation = currentFingerPosY - this.#storedFingerPositionY;

        this.#storedFingerPositionY = currentFingerPosY;
        
        const fingerMoveDownEvent = new CustomEvent('image-container-move-full-view', {
            bubbles: true,
            composed: true,
            detail: fingerPosCalculation
        });
        this.dispatchEvent(fingerMoveDownEvent);
    }

    #moveSubmenu(touchEvent) {
        const currentFingerPosY = touchEvent.touches[0].screenY;
	    const fingerPosCalculation = this.#storedFingerPositionY - (currentFingerPosY);

        this.#storedFingerPositionY = currentFingerPosY;

        const submenuMoveEvent = new CustomEvent('image-container-move-submenu', {
            bubbles: true,
            composed: true,
            detail: fingerPosCalculation
        });
        this.dispatchEvent(submenuMoveEvent)
    }

    #handleFingerDrop() {
        this.#root.ownerDocument.removeEventListener('selectstart', cancelSelect);
        this.#elems.slider.removeAttribute('scroll-disabled');
        this.removeEventListener('touchmove', this.#moveFullviewMenu, { passive: true });
        this.removeEventListener('touchmove', this.#moveSubmenu);

        const fingerDropEvent = new CustomEvent('image-container-finger-drop', {
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(fingerDropEvent);
    }
}
defineCustomElement('image-container', ImageContainer);
