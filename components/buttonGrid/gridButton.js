import { hostResets } from "../../assets/style/hostResets.js";
import { defineCustomElement } from "../../utils/defineCustomElement.js";

const style = /*css*/`
    ${hostResets}

    :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-lg);
        padding: var(--spacing-lg);
        border-radius: 8px;

        background-color: var(--inset-surface);
        color: var(--icon);
        border: 1px solid var(--border);
    }

    :host(.selected) {
        font-weight: bolder;
        background-color: var(--fill-accent);
        color: white;
        border-color: unset;
    }

    ::slotted(.icon), .icon {
        height: 32px;
        width: auto;
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <slot name=icon>
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
            <!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20"></path>
        </svg>
    </slot>
    <slot name="title">Title</slot>

    <style>${style}</style>
`;

export class GridButton extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));
    }

    #setPink() {
        if (this.classList.contains('selected')) return;

        const changeThemeEvent = new CustomEvent('theme-change', { bubbles: true });
        this.dispatchEvent(changeThemeEvent);
        
        this.classList.add('selected');

    }

    unsetPink() {
        this.classList.remove('selected');
    }

    connectedCallback() {
        this.addEventListener('click', this.#setPink.bind(this));
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.#setPink.bind(this));
    }
}
defineCustomElement('grid-button', GridButton);
