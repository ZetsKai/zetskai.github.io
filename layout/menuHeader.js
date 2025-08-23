import { defineCustomElement } from "../utils/defineCustomElement.js";
import { hostResets } from "../assets/style/hostResets.js"
import { hideSubpage } from "../utils/subpage.js";

const style = /*css*/`
    ${hostResets}

    :host {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: var(--spacing-lg);
        background-color: var(--surface);
        border-bottom: solid 1px var(--border);
    }

    .button {
        position: absolute;
        left: 0;
        height: 32px;
        width: auto;
        color: var(--icon);
    }
    .button:hover {
        color: black;
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <svg class="button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
        <!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
        <path d="m14.76 6.09-6.11 5.35c-.34.3-.34.83 0 1.13l6.11 5.35c.48.42 1.24.08 1.24-.56V6.65c0-.64-.76-.99-1.24-.56"></path>
    </svg>
    <slot name="title"><span class="title">Menu Title</span></slot>

    <style>${style}</style>
`;

export class MenuHeader extends HTMLElement {
    #root;
    constructor() {
        super();

        this.#root = this.attachShadow({ mode: 'closed' });
        this.#root.append(template.content.cloneNode(true));
    }

    connectedCallback() {
        const button = this.#root.querySelector('.button');
        button.addEventListener('click', hideSubpage);
    }

    disconnectedCallback() {
        const button = this.#root.querySelector('.button');
        button.removeEventListener('click', hideSubpage);
    }

    updateHeaderTitle() {
        const title = this.#root.querySelector('.title');
        // title.innerHTML = null;
    }
}
defineCustomElement('menu-header', MenuHeader);
