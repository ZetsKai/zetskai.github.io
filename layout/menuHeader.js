import { defineCustomElement } from "../utils/defineCustomElement.js";

const style = /*css*/`
    :host {
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }

        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: var(--spacing-lg);
        background-color: var(--light-surface);
        border-bottom: solid 1px var(--light-border);
    }

    ::slotted(.button__icon) {
        position: absolute;
        top: 0;
        left: 0;
        height: 32px;
        width: auto;
        color: var(--light-icon);
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <slot class="button" name="button"></slot>
    <slot class="title" name="title"><span>Menu Title</span></slot>

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
