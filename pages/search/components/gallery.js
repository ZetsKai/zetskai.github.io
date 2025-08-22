import { hostResets } from "../../../assets/style/hostResets.js";
import { defineCustomElement } from "../../../utils/defineCustomElement.js";
import { requestPosts } from "../../../utils/requestPosts.js";
import "./post.js";

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
    #postsData;
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.getImages();
    }

    disconnectedCallback() {}

    async getImages() {
        const columns = this.shadowRoot.querySelector('slot').assignedElements();
        if (columns.length === 0) return;

        try {
            this.#postsData = await requestPosts();

            let flag = 0;
            this.#postsData.forEach((post, index) => {
                const postComponent = document.createElement('post-image');
                postComponent.postData = { index, post };
                columns[flag].appendChild(postComponent);

                if (flag >= (columns.length - 1)) flag = 0;
                else flag++;
            });

            const postsFetchedEvent = new CustomEvent('fetchedPosts', {
                bubbles: true,
                composed: true,
                detail: this.#postsData
            });
            this.dispatchEvent(postsFetchedEvent);
        }
        catch(e) {
            console.error(e);
        }
        
    }

    get postsData() {
        return this.#postsData;
    }
}
defineCustomElement('post-gallery', Gallery);
