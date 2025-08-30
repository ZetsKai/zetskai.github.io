import { hostResets } from "../../../assets/style/hostResets.js";
import { defineCustomElement } from "../../../utils/defineCustomElement.js";
import { requestPosts } from "../../../utils/requestPosts.js";
import "./post.js";

const style = /*css*/`
    ${hostResets}

    :host {
        display: none;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-lg);
        max-width: 720px;
    }

    :host(.search__subpage--selected) {
        display: grid;
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <style>${style}</style>
`;

export class Gallery extends HTMLElement {
    #root;
    #postsData;
    constructor() {
        super();

        this.#root = this.attachShadow({ mode: 'closed' });
        this.#root.append(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.getImages();
    }

    disconnectedCallback() {}

    async getImages() {
        try {
            this.#postsData = await requestPosts({limit: 16});
            if (this.#postsData == undefined) throw 'Unable to get posts data.';

            const postComponentElem = this.#root.ownerDocument.createElement('post-image');

            this.#postsData.forEach((post, index) => {
                if (post.file.url == null) return;
                const postComponent = postComponentElem.cloneNode(true);
                
                postComponent.postData = { index, post };
                this.#root.appendChild(postComponent);
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
