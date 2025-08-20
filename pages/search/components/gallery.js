import { hostResets } from "../../../assets/style/hostResets.js";
import { defineCustomElement } from "../../../utils/defineCustomElement.js";
import { requestPosts } from "../../../utils/requestPosts.js";
import { store } from "../../../utils/store.js";
import { Post } from "./post.js";

const style = /*css*/`
    ${hostResets}

    :host {
        --gap: var(--spacing-lg);
        max-width: 720px;

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

        store.loadedPosts = [];
        store.selectedPost = null;
        const posts = await requestPosts();

        let flag = 0;
        posts.forEach(post => {
            const postComp = document.createElement('post-image');
            postComp.storePostData(post);
            columns[flag].appendChild(postComp);

            if (flag >= (columns.length - 1)) flag = 0;
            else flag++;

            store.loadedPosts.push(post);
        });
    }
}
defineCustomElement('post-gallery', Gallery);
