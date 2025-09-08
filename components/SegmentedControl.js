import { hostResets } from "../assets/style/hostResets.js";
import { defineCustomElement } from "../utils/defineCustomElement.js";

const style = /*css*/`
    ${hostResets}

    :host {
        overflow: hidden;
        display: flex;
        border-radius: 100px;
        background-color: var(--inset-surface);
        border: 1px solid black;
        border-color: var(--border);
    }

    ::slotted(.segmented-control__button) {
        position: relative;
        overflow: none;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-basis: 100%;
        padding: 8px;
        /* ! - huh, slotted elements need "!important"? */
        padding: var(--spacing-md) !important;
        border-radius: 100px;
        border: unset;
        background-color: unset;
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <slot></slot>

    <style>${style}</style>
`;

export class SegmentedControl extends HTMLElement {
    #root;
    #elems = {};

    constructor() {
        super();

        this.#root = this.attachShadow({ mode: 'closed' });
        this.#root.append(template.content.cloneNode(true));

        this.#elems.buttons = this.#root.querySelector('slot').assignedElements().map(button => button.querySelector('.radio-button'));
    }

    static get observedAttributes() {
        return ['disabled'];
    }

    connectedCallback() {}

    disconnectedCallback() {}

    attributeChangedCallback(name, oldValue, newValue) {
        const isDisabled = this.hasAttribute('disabled');

        if (isDisabled)
            this.#elems.buttons.forEach(buttonn => buttonn.disabled = true);
        else
            this.#elems.buttons.forEach(buttonn => buttonn.disabled = false);
    }
}
defineCustomElement('segmented-control', SegmentedControl);
