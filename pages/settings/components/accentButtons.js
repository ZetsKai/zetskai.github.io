import { hostResets } from "../../../assets/style/hostResets.js";
import { defineCustomElement } from "../../../utils/defineCustomElement.js";
import { setAccent } from "../../../utils/store.js";

const style = /*css*/`
    ${hostResets}

    :host {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-md);
    }

    .title {
        flex-basis: 100%;
        flex-grow: 1;
        font-weight: bold;
    }
    
    .button {
        height: 32px;
        aspect-ratio: 1/1;
        border-radius: 100px;
        padding: var(--spacing-sm);
        background-color: var(--inset-surface);
        border: 1px solid var(--border);
    }

    .button--selected {
        border-color: var(--button-color);
        border-width: 2px;
    }

     .button::before {
        display: block;
        background-color: var(--button-color);
        height: 100%;
        content: "";
        border-radius: inherit;
    }

    .button--brand {
        --button-color: var(--fill-accent-brand);
    }

    .button--blue {
        --button-color: var(--fill-accent-blue);
    }

    .button--orange {
        --button-color: var(--fill-accent-orange);
    }

    .button--green {
        --button-color: var(--fill-accent-green);
    }

    .button--neuter {
        --button-color: var(--fill-accent-neuter);
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <p class="title">Accent</p>
    <button class="button button--brand button--selected" value="brand"></button>
    <button class="button button--blue" value="blue"></button>
    <button class="button button--orange" value="orange"></button>
    <button class="button button--green" value="green"></button>
    <button class="button button--neuter" value="neuter"></button>

    <style>${style}</style>
`;

export class AccentButtons extends HTMLElement {
    #root;
    #buttons;

    constructor() {
        super();

        this.#root = this.attachShadow({ mode: 'closed' });
        this.#root.append(template.content.cloneNode(true));

        this.#buttons = this.#root.querySelectorAll('.button');
    }

    #setAccentColor(accentButtonEvent) {
        const clickedButton = accentButtonEvent.currentTarget;
        const selectedButton = [...this.#buttons].find(btn => btn.classList.contains('button--selected'));

        if (selectedButton != undefined) selectedButton.classList.remove('button--selected');
        clickedButton.classList.add('button--selected');

        setAccent(clickedButton.value);
    }

    connectedCallback() {
        this.#buttons.forEach(btn => btn.addEventListener('click', this.#setAccentColor.bind(this)));
    }

    disconnectedCallback() {
        this.#buttons.forEach(btn => btn.removeEventListener('click', this.#setAccentColor));
    }
}
defineCustomElement('accent-buttons', AccentButtons);
