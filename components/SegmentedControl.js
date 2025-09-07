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

    ::slotted(button) {
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

    ::slotted(.segmented-control__button--checked) {
        font-weight: bold;
        background-color: var(--fill-accent-brand);
        color: white;
    }

    ::slotted(button:disabled) {
        background-color: unset;
        color: gray;
    }

    ::slotted(.segmented-control__button--checked:disabled) {
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

    #internals;
    static formAssociated = true;

    constructor() {
        super();

        this.#root = this.attachShadow({ mode: 'closed', disperseFocus: true });
        this.#root.append(template.content.cloneNode(true));
        this.#internals = this.attachInternals();

        this.#elems.buttons = this.#root.querySelector('slot').assignedElements();
    }

    static get observedAttributes() {
        return ['disabled'];
    }

    connectedCallback() {
        // this.#internals.setFormValue(this.#elems.buttons[0].value);

        this.#elems.buttons.forEach(button => button.addEventListener('click', this.#setValue.bind(this)));
        this.#elems.buttons.forEach(button => button.addEventListener('click', this.#switchButton.bind(this)));
        this.#elems.buttons[1].click();

    }

    disconnectedCallback() {
        this.#elems.buttons.forEach(buttonn => buttonn.removeEventListener('click', this.#setValue.bind(this)));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const isDisabled = this.hasAttribute('disabled');

        if (isDisabled)
            this.#elems.buttons.forEach(buttonn => buttonn.disabled = true);
        else
            this.#elems.buttons.forEach(buttonn => buttonn.disabled = false);
    }

    #switchButton(buttonEvent) {
        const CLASS_NAME ='segmented-control__button--checked';
        const previouslySelectedButton = this.#elems.buttons.find(button => button.classList.contains(CLASS_NAME));
        const clickedButton = buttonEvent.target;

        if (previouslySelectedButton !== undefined) previouslySelectedButton.classList.remove(CLASS_NAME);
        clickedButton.classList.add(CLASS_NAME);
    }

    #setValue(buttonEvent) {
        this.#internals.setFormValue(buttonEvent.target.value);

        const toggleEvent = new CustomEvent('segmented-control-button-click', {
            bubbles: true,
            composed: true
        });
        buttonEvent.target.dispatchEvent(toggleEvent);
    }
}
defineCustomElement('segmented-control', SegmentedControl);
