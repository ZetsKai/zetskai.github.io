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

    ::slotted(input) {
        appearance: none;
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

    ::slotted(input)::before {
        display: block;
        content: attr(text);
    }

    ::slotted(input:checked) {
        font-weight: bold;
        background-color: var(--fill-accent-brand);
        color: white;
    }

    ::slotted(input:disabled) {
        background-color: unset;
        color: gray;
    }

    ::slotted(input:checked:disabled) {
        background-color: lightgray;
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

    // #internals;
    // static formAssociated = true;

    constructor() {
        super();

        this.#root = this.attachShadow({ mode: 'closed', disperseFocus: true });
        this.#root.append(template.content.cloneNode(true));
        // this.#internals = this.attachInternals();

        this.#elems.radioButtons = this.#root.querySelector('slot').assignedElements();
    }

    static get observedAttributes() {
        return ['disabled'];
    }

    connectedCallback() {
        this.#elems.radioButtons[0].checked = true;
        // this.#internals.setFormValue(this.#elems.radioButtons[0].value);

        this.#elems.radioButtons.forEach(radioButton => radioButton.addEventListener('click', this.#setValue.bind(this)));
    }

    disconnectedCallback() {
        this.#elems.radioButtons.forEach(radioButton => radioButton.removeEventListener('click', this.#setValue.bind(this)));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const isDisabled = this.hasAttribute('disabled');

        if (isDisabled)
            this.#elems.radioButtons.forEach(radioButton => radioButton.disabled = true);
        else
            this.#elems.radioButtons.forEach(radioButton => radioButton.disabled = false);
    }

    #setValue(buttonEvent) {
        // this.#internals.setFormValue(buttonEvent.target.value);

        const toggleEvent = new CustomEvent('segmented-control-button-click', {
            bubbles: true,
            composed: true
        });
        buttonEvent.target.dispatchEvent(toggleEvent);
    }
}
defineCustomElement('segmented-control', SegmentedControl);
