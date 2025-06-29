import { defineCustomElement } from "../../../utils/defineCustomElement.js";
import { hostResets } from "../../../assets/style/hostResets.js";

const style = /*css*/`
    ${hostResets}

    :host {
        display: block;
        padding: var(--spacing-lg);
        background-color: var(--light-surface);
        border: 1px solid var(--light-border);
        border-radius: 8px;
    }

    button {
        // padding: 0;
    }

    .themes__btn {
        width: 100px;
        height: 100px;
        border-radius: 0;
        outline: unset;
        accent-color: var(--fill-accent-brand);
    }

    .themes__btn::after {
        display: block;
        background-color: red;

        content: "hello";
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <p>Theme</p>
    <div class="themes">
        <input type="radio" name="theme" value="foxden" class="themes__btn">
        <input type="radio" name="theme" value="e621" class="themes__btn">
    </div>
    <div class="modes">
        <button class="modes__btn">Auto</button>
        <button class="modes__btn">Light</button>
        <button class="modes__btn">Dark</button>
    </div>
    <div class="accents">
        <p>Accent</p>
        <input class="accents__btn" type="radio" name="accent" value="pink">
        <input class="accents__btn" type="radio" name="accent" value="blue">
        <input class="accents__btn" type="radio" name="accent" value="orange">
        <input class="accents__btn" type="radio" name="accent" value="green">
        <input class="accents__btn" type="radio" name="accent" value="neuter">
    </div>
    <div class="toggle">
        <p>Transparency</p>
        <input class="toggle__btn" type="checkbox" name="Transparency">
    </div>

    <style>${style}</style>
`;

export class Theme extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));
    }

    connectedCallback() {}
    disconnectedCallback() {}
}
defineCustomElement('theme-options', Theme);
