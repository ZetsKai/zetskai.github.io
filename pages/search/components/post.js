import { hostResets } from "../../../assets/style/hostResets.js";
import { defineCustomElement } from "../../../utils/defineCustomElement.js";
import { store } from "../../../utils/store.js";

const style = /*css*/`
    ${hostResets}

    :host {
        display: block;
        position: relative;
        overflow: hidden;
        width: 100%;
        background-color: green;
        border: 1px solid var(--border);
        border-radius: 8px;
    }

    :host-context(.column) {
        width: 100%;
    }

    .image {
        display: block;
        width: 100%;
        height: auto;
    }

    .stats, .heart-btn {
        position: absolute;
    }

    .stats {
        bottom: 0;
        left: 0;
        display: flex;
        flex-wrap: wrap;
        box-sizing: content-box;
        max-width: 100%;
        gap: var(--spacing-sm);
        padding: var(--spacing-sm);
        font-size: 12px;
        border-radius: 0 8px 0 0;
        background-color: rgba(0 0 0 / 0.65);
        color: white;
        backdrop-filter: blur(0.5px);
    }

    .stats[data-rating]::after {
        content: attr(data-rating);
        font-weight: bolder;
    }

    .stats[data-rating="S"]::after {
        color: var(--fill-safe);
    }
    .stats[data-rating="Q"]::after {
        color: var(--fill-questionable);
    }
    .stats[data-rating="E"]::after {
        color: var(--fill-explicit);
    }

    .stats__icon {
        height: 12px;
        width: auto;
    }

    .stats__comments {
        display: flex;
        align-items:center
    }

    .stats__rating {
        font-weight: bolder;
    }

    .heart-btn {
        top: var(--spacing-md);
        right: var(--spacing-md);
        color: white;
    }
    .heart-btn--fav {
        color: #DE3D3D;
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <img class="image" src="" alt=""/>
    <div class="stats">
        <span class="stats__likes">99999+</span>
        <span class="stats__comments">
            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 1.10001H2C1.4485 1.10001 1 1.54851 1 2.10001V11.1L3 9.10001H10C10.5515 9.10001 11 8.6515 11 8.10001V2.10001C11 1.54851 10.5515 1.10001 10 1.10001Z" fill="white"/>
            </svg>
            999+
        </span>
    </div>
    <svg class="heart-btn" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.9956 4.20831C16.7028 4.20886 17.4034 4.34936 18.0562 4.6214C18.7087 4.89339 19.3011 5.29165 19.7993 5.79327L19.8003 5.79425C21.9357 7.93881 21.9331 11.2734 19.8032 13.4026L11.9995 21.2054L4.19678 13.4026C2.06659 11.2732 2.06457 7.93846 4.1958 5.79816L4.19678 5.79718C4.69536 5.29443 5.28845 4.89505 5.94189 4.62238C6.5138 4.38374 7.12216 4.24628 7.73975 4.21515L8.00439 4.20831C9.34106 4.20846 10.6288 4.71087 11.6128 5.61554L11.9995 5.97101L12.3862 5.61554C13.3089 4.76738 14.499 4.27293 15.7456 4.21417L15.9956 4.20831Z" fill="white" stroke="#CCCCCC" stroke-width="1.14286"/>
    </svg>

    <style>${style}</style>
`;

export class Post extends HTMLElement {
    #postData;

    constructor() {
        super()

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));
    }
    
    connectedCallback() {
        const heartBtn = this.shadowRoot.querySelector('.heart-btn');
        const imageContainer = this.shadowRoot.querySelector('.image');
        const statsContainer = this.shadowRoot.querySelector('.stats');

        imageContainer.src = this.#postData.preview.url;
        statsContainer.setAttribute('data-rating', this.#postData.rating.toUpperCase());

        heartBtn.addEventListener('click', this.handleFavorite);
        this.addEventListener('click', this.openInFullView);
    }

    storePostData(postData) { this.#postData = postData; };

    handleFavorite(e) {
        console.log(e);
    }

    openInFullView() {
        const fullViewEvent = new CustomEvent('full-view', {
            bubbles: true,
            composed: true,
            detail: this.#postData
        })

        this.dispatchEvent(fullViewEvent);

        store.selectedPost = this.#postData;
    }
}
defineCustomElement('post-image', Post);
