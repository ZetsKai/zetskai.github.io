import { defineCustomElement } from "../../../utils/defineCustomElement.js";
import { hostResets } from "../../../assets/style/hostResets.js";

const style = /*css*/`
    ${hostResets}

    :host {
        display: flex;
        gap: var(--spacing-lg);
        padding: var(--spacing-lg);
        background-color: var(--surface);
    }

    .button {
        height: 100%;
        aspect-ratio: 1/1;
        padding: var(--spacing-md);
        border: none;
        outline: none;
    }

    .button__icon {
        height: var(--icon-lg);
        width: auto;
    }

    .searchbox {
        display: flex;
        flex-basis: 100%;
        border-radius: 100px;
        background-color: var(--inset-surface);
        border: 1px solid var(--border);
        overflow: hidden;

        &:hover {
            border-color: var(--fill-accent);
        }
    }

    .searchbox__input {
        flex-basis: 100%;
        padding: var(--spacing-md);
        font-size: 16px;
        background-color: transparent;
        border: none;
        outline: none;
    
        &::highlight {
            outline: 1px solid var(--fill-accent);
        }

        &::placeholder {
            font-style: italic;
            color: var(--inset-text);
        }
    }

    .searchbox__button {
        color: white;
        background-color: var(--fill-accent);
    }

    .filter-button {
        color: var(--icon);
        background-color: transparent;
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <div class="searchbox">
        <input class="searchbox__input" name="searchbar" placeholder="Search with Tags" type="search">
        <button class="searchbox__button button">
            <svg class="searchbox__icon button__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
                <!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
                <path d="m18,10c0-4.41-3.59-8-8-8S2,5.59,2,10s3.59,8,8,8c1.85,0,3.54-.63,4.9-1.69l5.1,5.1,1.41-1.41-5.1-5.1c1.05-1.36,1.69-3.05,1.69-4.9Zm-14,0c0-3.31,2.69-6,6-6s6,2.69,6,6-2.69,6-6,6-6-2.69-6-6Z"></path>
            </svg>
        </button>
    </div>
    <button class="filter-button button">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
            <!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
            <path d="m20,2H4c-.55,0-1,.45-1,1v2c0,.24.09.48.25.66l6.75,7.72v7.62c0,.4.24.77.62.92.12.05.25.08.38.08.26,0,.52-.1.71-.29l2-2c.19-.19.29-.44.29-.71v-5.62l6.75-7.72c.16-.18.25-.42.25-.66v-2c0-.55-.45-1-1-1Z"></path>
        </svg>
    </button>

    <style>${style}</style>
`;

export class SearchComponent extends HTMLElement {
    #root;
    #elems = {};
    
    #internals
    static formAssociated = true;
    
    constructor() {
        super();

        this.#root = this.attachShadow({ mode: 'closed'});
        this.#root.append(template.content.cloneNode(true));
        this.#internals = this.attachInternals();
    }

    static get observedAttributes() {
        return [];
    }

    connectedCallback() {
        this.#elems.searchbox = this.#root.querySelector('.searchbox__input');
        this.#elems.searchButton = this.#root.querySelector('.searchbox__button');
        this.#elems.filterButton = this.#root.querySelector('.filter-button');

        this.#elems.searchbox.addEventListener('keydown', this.#initiateSearch.bind(this));
        this.#elems.searchButton.addEventListener('click', this.#initiateSearch.bind(this));
        this.#elems.filterButton.addEventListener('click', this.#openFiltersMenu);
    }

    disconnectedCallback() {
        this.#elems.searchbox.removeEventListener('keydown', this.#initiateSearch.bind(this));
        this.#elems.searchButton.removeEventListener('click', this.#initiateSearch.bind(this));
        this.#elems.filterButton.removeEventListener('click', this.#openFiltersMenu);
    }

    attributeChangedCallback(name, oldValue, newValue) {}

    #initiateSearch(keydownEvent) {
        if (keydownEvent.type === 'keydown' && keydownEvent.key !== 'Enter') return;

        this.#internals.setFormValue(this.#elems.searchbox.value);
        
        const searchEvent = new CustomEvent('search-component-search', {
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(searchEvent);
    }

    #openFiltersMenu() {
        const openFilterMenuEvent = new CustomEvent('openFilterMenu', {
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(openFilterMenuEvent);
    }
}
defineCustomElement('search-component', SearchComponent);
