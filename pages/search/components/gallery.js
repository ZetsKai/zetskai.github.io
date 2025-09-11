import { hostResets } from "../../../assets/style/hostResets.js";
import { defineCustomElement } from "../../../utils/defineCustomElement.js";
import { requestPosts } from "../../../utils/requestPosts.js";
import "./post.js";

const style = /*css*/`
    ${hostResets}

    :host {
        display: none;
    }

    :host(.search__subpage--selected) {
        display: block;
    }

    .posts-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-lg);
        max-width: 720px;
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <div class="posts-container"></div>
    <style>${style}</style>
`;

export class Gallery extends HTMLElement {
    #root;
    constructor() {
        super();

        this.#root = this.attachShadow({ mode: 'closed' });
        this.#root.append(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.getImages();
    }

    disconnectedCallback() {}

    async getImages(searchString = 'rating:safe') {
        try {
            const postsData = await requestPosts({tags: searchString, limit: 100});
            if (postsData == undefined || postsData.length === 0) throw 'Unable to get posts data.';
        
            const postsTabsContainer = this.#root.querySelector('.posts-container');
            const postComponentElem = this.#root.ownerDocument.createElement('post-image');

            const posts = postsData.map((post, index) => {
                if (post.file.url == null) return;
                const postComponent = postComponentElem.cloneNode(true);
                
                postComponent.postData = { index, post };
                return postComponent;
            });

            postsTabsContainer.innerHTML = null;
            postsTabsContainer.append(...posts);

            const postsFetchedEvent = new CustomEvent('fetchedPosts', {
                bubbles: true,
                composed: true,
                detail: postsData
            });
            this.dispatchEvent(postsFetchedEvent);
        }
        catch(e) {
            console.error(e);
        }
    }
}
defineCustomElement('post-gallery', Gallery);
