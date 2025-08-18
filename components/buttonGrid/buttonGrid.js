import { hostResets } from "../../assets/style/hostResets.js";
import { defineCustomElement } from "../../utils/defineCustomElement.js";
import { GridButton } from './gridButton.js';

const style = /*css*/`
    ${hostResets}

    :host {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-md);
        width: 100%;
    }

    ::slotted(.title), .title {
        grid-column: 1 / 3;
        line-height: 1.0;
        font-weight: bold;
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <slot name="title" class="title">Grid Buttons</slot>
    <slot name="grid-buttons"></slot>

    <style>${style}</style>
`;

export class ButtonGrid extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));
    }

    #changeTheme() {
        const slotElems = this.shadowRoot.querySelector('slot[name="grid-buttons"]').assignedElements()
        const selectedButton = slotElems.find(elem => elem.classList.contains('selected'));
        
        if (selectedButton !== null) selectedButton.unsetPink();
    }

    connectedCallback() {
        this.addEventListener('theme-change', this.#changeTheme.bind(this));
    }

    disconnectedCallback() {
        this.removeEventListener('theme-change', this.#changeTheme.bind(this));
    }
}
defineCustomElement('button-grid', ButtonGrid);
