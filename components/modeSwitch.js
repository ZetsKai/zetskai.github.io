import { hostResets } from "../assets/style/hostResets.js";
import { defineCustomElement } from "../utils/defineCustomElement.js";

const style = /*css*/`
    ${hostResets}

    :host {
        display: flex;
        overflow: hidden;
        height: auto;
        border-radius: 100px;
        background-color: var(--inset-surface);
        border: 1px solid var(--border);
    }

    .btn {
        flex-basis: 100%;
        flex-grow: 1;
        height: min-content;
    }

    .btn::before {
        display: block;
        width: 100%;
        min-height: 1000px;
        padding: var(--spacing-md);
        text-align: center;
        background-color: var(--inset-surface);
        content: attr(data-val);
    }

    .btn:checked::before {
        background-color: var(--fill-accent-brand);
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <slot></slot>

    <style>${style}</style>
`;

export class ModeSwitch extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));
    }

    connectedCallback() {}

    disconnectedCallback() {}
}
defineCustomElement('mode-switch', ModeSwitch);
