import { hostResets } from "../assets/style/hostResets.js";
import { defineCustomElement } from "../utils/defineCustomElement.js";

const style = /*css*/`
    ${hostResets}

    :host {
        overflow: hidden;
        display: flex;
        border-radius: 100px;
        background-color: var(--inset-surface);
        border: 1px solid var(--border);
    }

    ::slotted(.mode-switch__button) {
        flex-basis: 100%;
        flex-grow: 1;
        padding: var(--spacing-md) !important;
        border-radius: 100px;
        border: unset;
        background-color: unset;
    }

    ::slotted(.mode-switch__button--selected) {
        font-weight: bold;
        background-color: var(--fill-accent);
        color: white;
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <slot></slot>

    <style>${style}</style>
`;

export class ModeSwitch extends HTMLElement {
    #root;
    constructor() {
        super();

        this.#root = this.attachShadow({ mode: 'closed' });
        this.#root.append(template.content.cloneNode(true));

        this.buttons = this.#root.querySelector('slot').assignedElements();
    }

    #switchButton(buttonEvent) {
        const SELECTED_CLASSNAME = 'mode-switch__button--selected';
        const clickedButton = buttonEvent.currentTarget;
        const selectedButton = this.buttons.find(btn => btn.classList.contains(SELECTED_CLASSNAME));

        selectedButton.classList.remove(SELECTED_CLASSNAME);
        clickedButton.classList.add(SELECTED_CLASSNAME);
    }

    connectedCallback() {
        this.buttons.forEach(btn => btn.addEventListener('click', this.#switchButton.bind(this)));
    }

    disconnectedCallback() {
        this.buttons.forEach(btn => btn.removeEventListener('click', this.#switchButton));
    }
}
defineCustomElement('mode-switch', ModeSwitch);
