import { defineCustomElement } from "../utils/defineCustomElement.js";
import { hostResets } from "../assets/style/hostResets.js";

const style = /*css*/`
    ${hostResets}

    :host {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-block: var(--spacing-md);
    }

    .toggle {
        --size: 24px;
        appearance: none;
        outline: unset;
        display: flex;
        width: calc(var(--size) * 2);
        height: var(--size);
        border-radius: 100px;
        background-color: var(--inset-surface);
        border: 1px solid var(--border);
    }

    .toggle::before {
        display: block;
        height: 100%;
        aspect-ratio: 1/1;
        border-radius: 100px;
        background-color: var(--icon);
        border: 1px solid var(--border);
        content: "";
    }

    .toggle:checked {
        justify-content: flex-end;
        background-color: var(--fill-accent-brand);
    }

    .toggle:checked::before {
        background-color: white;
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <slot>Toggle Title</slot>
    <input type="checkbox" name="toggle" class="toggle">

    <style>${style}</style>
`;

export class Toggle extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));
    }

    connectedCallback() {}

    disconnectedCallback() {}
}
defineCustomElement('toggle-option', Toggle);
