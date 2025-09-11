import { hostResets } from "../../../assets/style/hostResets.js";
import { defineCustomElement } from "../../../utils/defineCustomElement.js";
import { requestPosts } from "../../../utils/requestPosts.js";
import "./PostComponent.js";

const style = /*css*/`
    ${hostResets}

    :host {
        display: none;
        max-width: 760px;
        width: 100%;
        /* width: minmax(760px, 100%); */
    }

    :host(.search__subpage--selected) {
        display: block;
    }

    .posts-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-lg);
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <div class="posts-container"></div>
    <style>${style}</style>
`;

export class PostGallery extends HTMLElement {
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

    async getImages(searchString = 'rating:explicit') {
        try {
            const postsData = await requestPosts({tags: searchString, limit: 70});
            if (postsData == undefined || postsData.length === 0) throw 'Unable to get posts data.';
        
            const postsTabsContainer = this.#root.querySelector('.posts-container');
            const postComponentElem = this.#root.ownerDocument.createElement('post-component');            

            postsTabsContainer.innerHTML = null;

            let index = 0;
            for (const post of postsData) {
                if (post == undefined || post == null || post == '') continue;
                if (post.file.url == null) continue;

                const postComponent = postComponentElem.cloneNode(true);
                postComponent.postData = { index, post };
                postsTabsContainer.append(postComponent);
                index++;
            }

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
defineCustomElement('post-gallery', PostGallery);
