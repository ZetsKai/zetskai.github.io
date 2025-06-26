import { defineCustomElement } from "../utils/defineCustomElement.js";
import { hostResets } from "../assets/style/hostResets.js"

const style = /*css*/`
    ${hostResets}

    :host {

        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: var(--spacing-lg);
        background-color: var(--light-surface);
        border-bottom: solid 1px var(--light-border);
    }

    ::slotted(.button) {
        position: absolute;
        left: 0;
        height: 32px;
        width: auto;
        color: var(--light-icon);
    }
    ::slotted(:hover) {
        color: black;
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <slot name="button"></slot>
    <slot name="title"><span class="title">Menu Title</span></slot>

    <style>${style}</style>
`;

export class MenuHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));
    }
}
defineCustomElement('menu-header', MenuHeader);
