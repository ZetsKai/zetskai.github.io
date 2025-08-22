import { defineCustomElement } from "../../../../../utils/defineCustomElement.js";
import { hostResets } from "../../../../../assets/style/hostResets.js";
import { store } from "../../../../../utils/store.js";
const style = /*css*/`
    ${hostResets}

    :host {
        display: flex;
        position: absolute;
        left: 0;
        bottom: var(--spacing-xl);
        justify-content: space-between;
        width: 100%;
        padding-inline: var(--spacing-xl);
        color: white;
    }

    .score, .fav-button {
        border-radius: 100px;
        background-color: #00000080;
    }

    .score {
        display: flex;
        align-items: center;
        overflow: hidden;
    }

    .score__button, .fav-button {
        padding: var(--spacing-lg);
        color: white;
        outline: unset;
        border: unset;
    }

    .score__button {
        background-color: transparent;
    }

    .fav-button {
        background-color: #00000080;
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <div class="score">
        <button class="score__button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
                <!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
                <path d="M12.87 3.51c-.35-.63-1.39-.63-1.74 0l-9 16c-.17.31-.17.69 0 1s.51.5.86.5h18c.36 0 .68-.19.86-.5s.18-.69 0-1z"></path>
            </svg>
        </button>
        <div class="score__counter">0!</div>
        <button class="score__button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
                <!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
                <path d="M12.87 3.51c-.35-.63-1.39-.63-1.74 0l-9 16c-.17.31-.17.69 0 1s.51.5.86.5h18c.36 0 .68-.19.86-.5s.18-.69 0-1z"></path>
            </svg>
        </button>
    </div>
    <button class="fav-button">
        <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
            <!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
            <path d="M11.29 20.69c.2.2.45.29.71.29s.51-.1.71-.29l7.5-7.5c2.35-2.35 2.35-6.05 0-8.41-2.29-2.29-5.84-2.35-8.21-.2-2.36-2.15-5.91-2.09-8.21.2-2.35 2.36-2.35 6.06 0 8.41z"></path>
        </svg>
    </button>

    <style>${style}</style>
`;

export class ScoreFav extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['score'];
    }

    connectedCallback() {}

    disconnectedCallback() {}

    attributeChangedCallback(name, oldValue, newValue) {
        this.shadowRoot.querySelector('.score__counter').innerHTML = newValue;
    }
}
defineCustomElement('score-fav', ScoreFav);
