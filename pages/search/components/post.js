import { hostResets } from "../../../assets/style/hostResets.js";
import { defineCustomElement } from "../../../utils/defineCustomElement.js";

const style = /*css*/`
    // ${hostResets}

    :host {
        display: block;
        position: relative;
        overflow: hidden;
        width: 100%;
        background-color: green;
        border: 1px solid var(--light-border);
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
        box-sizing: content-box;
        bottom: 0;
        left: 0;
        padding: var(--spacing-sm);
        font-size: 12px;
        border-radius: 0 8px 0 0;
        background-color: rgba(0 0 0 / 0.5);
        color: white;
    }

    .stats__icon {
        height: 12px;
        width: auto;
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
        <span class="stats__comments">999+</span>
        <span class="stats__rating">R</span>
    </div>
    <svg class="heart-btn" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.9956 4.20831C16.7028 4.20886 17.4034 4.34936 18.0562 4.6214C18.7087 4.89339 19.3011 5.29165 19.7993 5.79327L19.8003 5.79425C21.9357 7.93881 21.9331 11.2734 19.8032 13.4026L11.9995 21.2054L4.19678 13.4026C2.06659 11.2732 2.06457 7.93846 4.1958 5.79816L4.19678 5.79718C4.69536 5.29443 5.28845 4.89505 5.94189 4.62238C6.5138 4.38374 7.12216 4.24628 7.73975 4.21515L8.00439 4.20831C9.34106 4.20846 10.6288 4.71087 11.6128 5.61554L11.9995 5.97101L12.3862 5.61554C13.3089 4.76738 14.499 4.27293 15.7456 4.21417L15.9956 4.20831Z" fill="white" stroke="#CCCCCC" stroke-width="1.14286"/>
    </svg>

    <style>${style}</style>
`;

export class Post extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));
    }
    
    connectedCallback() {
        const heartBtn = this.shadowRoot.querySelector('.heart-btn');
        heartBtn.addEventListener('click', this.handleFavorite);        
    }
    
    async assignImage(imgData) {
        const image = this.shadowRoot.querySelector('.image')
        image.src = imgData;
    }

    handleFavorite(e) {
        console.log(e);
    }
}
defineCustomElement('post-image', Post);
