import { defineCustomElement } from '../../../utils/defineCustomElement.js';

const style = /*css*/`
    ${hostResets}

    :host {
        display: block;
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    

    <style>${style}</style>
`;

export class LayoutFeatures extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));
    }

    connectedCallback() {}

    disconnectedCallback() {}
}
defineCustomElement('layout-features', LayoutFeatures);
