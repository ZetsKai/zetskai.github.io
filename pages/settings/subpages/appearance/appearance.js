import { defineCustomElement } from "../../../../utils/defineCustomElement.js";
import { hostResets } from "../../../../assets/style/hostResets.js";
import { Accent } from "./accent.js";
import { Theme } from './theme.js';
import { Toggle } from "../../../../components/toggle.js";

const style = /*css*/`
    ${hostResets}

    :host {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <theme-options></theme-options>
    <accent-buttons></accent-buttons>
    <toggle-option>Transparency</toggle-option>

    <style>${style}</style>
`;

export class Appearance extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));
    }

    connectedCallback() {}
    disconnectedCallback() {}
}
defineCustomElement('appearance-options', Appearance);
