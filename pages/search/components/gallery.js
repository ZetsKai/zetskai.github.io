import { hostResets } from "../../../assets/style/hostResets.js";
import { defineCustomElement } from "../../../utils/defineCustomElement.js";
import { Post } from "./post.js";

const style = /*css*/`
    ${hostResets}

    :host {
        --gap: var(--spacing-lg);

        display: none;
    }

    :host(.search__subpage--selected) {
        display: flex;
        gap: var(--gap);
    }

    ::slotted(.column) {
        display: flex;
        flex-direction: column;
        flex-basis: 100%;
        grow: 1;
        gap: var(--gap);
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <slot></slot>

    <style>${style}</style>
`;

export class Gallery extends HTMLElement {
    #loaded
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));

        this.#loaded = false;
    }

    connectedCallback() {
        
        if (this.#loaded) return
        this.getImages();
        this.#loaded = true;
    }

    disconnectedCallback() {}

    async getImages() {
        const columns = this.shadowRoot.querySelector('slot').assignedElements();
        if (columns.length === 0) return;
    
        // const posts = fetch();
        const posts = [
            'https://static1.e926.net/data/ab/b7/abb730ed9734e6ec1c08c6d90be59be4.jpg',
            'https://static1.e926.net/data/e2/d3/e2d3892a36c9bc4e2e8e44720b07ee48.png',
            'https://static1.e926.net/data/c0/fa/c0fa5293f1d1440c2d3f2c3e027d3c36.jpg',
            'https://static1.e926.net/data/10/a5/10a562c5d6a6398716a7bcc9ada5f612.png',
            'https://static1.e926.net/data/4a/de/4adeba19a4b8cd5608024f059ac12f88.png',
            'https://static1.e926.net/data/0f/d0/0fd077c78f42bfd26db3a9cc5397edce.png'
        ];
        let flag = 0;

        posts.forEach(post => {
            const postComp = document.createElement('post-image');
            postComp.assignImage(post);
            columns[flag].appendChild(postComp);

            if (flag >= (columns.length - 1))
                flag = 0;
            else
                flag++;
        });
    }
}
defineCustomElement('post-gallery', Gallery);
