import { hostResets } from "../../../../assets/style/hostResets.js";
import { defineCustomElement } from "../../../../utils/defineCustomElement.js";

const style = /*css*/`
    ${hostResets}

    :host {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-md);
    }

    .title {
        flex-basis: 100%;
        flex-shrink: 0;
    }

    .button {
        height: 24px;
        aspect-ratio: 1/1;
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <p class="title">Accent</p>
    <input class="button" type="radio" name="accent" value="pink">
    <input class="button" type="radio" name="accent" value="blue">
    <input class="button" type="radio" name="accent" value="orange">
    <input class="button" type="radio" name="accent" value="green">
    <input class="button" type="radio" name="accent" value="neuter">

    <style>${style}</style>
`;

export class Accent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));
    }

    connectedCallback() {}

    disconnectedCallback() {}
}
defineCustomElement('accent-buttons', Accent);
