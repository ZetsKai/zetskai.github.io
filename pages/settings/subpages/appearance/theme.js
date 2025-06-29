import { hostResets } from "../../../../assets/style/hostResets.js";
import { defineCustomElement } from "../../../../utils/defineCustomElement.js";

const style = /*css*/`
    ${hostResets}

    :host, .themes, .themes__btn::before, .modes {
        display: flex;
    }

    :host {
        flex-direction: column;
        gap: var(--spacing-md);
    }

    .themes {
        gap: var(--spacing-lg);
    }
    
    .themes__btn {
        flex-basis: 100%;
        flex-grow: 1;
        height: 100px;
        border-radius: 0;
        accent-color: var(--fill-accent-brand);
    }
    
    .themes__btn::before {
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: var(--inset-surface);
        border: 1px solid var(--border);
        border-radius: 8px;
        content: attr(data-val);
    }

    .themes__btn:checked::before {
        background-color: var(--fill-accent-brand);
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <p class="title">Theme</p>
    <div class="themes">
        <input type="radio" name="theme" value="foxden" class="themes__btn" data-val="Foxden">
        <input type="radio" name="theme" value="e621" class="themes__btn" data-val="e621">
    </div>
    <div class="modes">
        <input type="radio" name="mode" value="auto" class="modes__btn" data-val="Auto">
        <input type="radio" name="mode" value="light" class="modes__btn" data-val="Light">
        <input type="radio" name="mode" value="dark" class="modes__btn" data-val="Dark">
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
