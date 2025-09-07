import { hostResets } from "../../../assets/style/hostResets.js";
import { defineCustomElement } from "../../../utils/defineCustomElement.js";

const style = /*css*/`
    ${hostResets}

    :host {
        z-index: 8;
        position: absolute;
        bottom: 0;
        display: none;
        width: 100%;
        height: 75%;
        max-height: 100%;
        background-color: var(--surface);
    }

    :host([open]) {
        display: block;
    }

    .shadow {
        position: absolute;
        bottom: 100%;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(1px);
        z-index: 255;
    }

    .scrollable-container {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
        padding: var(--spacing-lg);
        height: 100%;
        overflow-y: scroll;
    }

    .section {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);

        /* ! - not working for some reason. */
        &:not(:last-of-type) {
            padding-bottom: var(--spacing-lg);
            border-bottom: 1px solid var(--border);
        }
    }

    .section__title {
        display: block;
    }

    .section__dropdown {
        padding: var(--spacing-md);
        border-radius: 100px;
        font-size: 16px;
        background-color: var(--inset-surface);
        border: 1px solid var(--border);
    }
    
    segmented-control[disabled] {
        display: none;
    }

    .section__buttons {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-md);
    }

    .section__button {
        appearance: none;
        padding: var(--spacing-md);
        border-radius: 100px;
        background-color: var(--inset-surface);
        border: 1px solid var(--border);

        &::before {
            display: block;
            content: attr(text);
        }

        &:checked {
            font-weight: bolder;
            color: white;
            background-color: var(--fill-accent);
            border: none;
        }

        &:disabled {
            color: gray;
        }
    }

    .section__button--safe:checked {
        background-color: var(--fill-safe);
    }
    .section__button--questionable:checked {
        background-color: var(--fill-questionable);
    }
    .section__button--explicit:checked {
        background-color: var(--fill-explicit);
    }

    .confirmation {
        display: flex;
        justify-content: flex-end;
        gap: var(--spacing-md);
        margin-top: auto;
    }

    .confirmation__button {
        flex-basis: 100%;
        padding: var(--spacing-lg);
        border-radius: 100px;
        background-color: var(--inset-surface);
        border: 1px solid var(--border);
    }

    .confirmation__button--apply {
        font-weight: bolder;
        color: white;
        background-color: var(--fill-accent);
        border: none;
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <div class="shadow"></div>
    <form class="filter-form" action="" method="get">
        <div class="scrollable-container">
            <div class="section">
                <label class="section__title" for="filter-by">Sort By</label>
                <select id="filter-by" class="section__dropdown">
                    <option value="date">Date</option>
                    <option value="score">Score</option>
                </select>
                <segmented-control name="date">
                    <button name="date" type="button" value="order:created">Newest</button>
                    <button name="date" type="button" value="order:created_asc">Oldest</button>
                </segmented-control>
                <segmented-control name="score" disabled>
                    <button name="score" type="button" value="order:score">Most Popular</button>
                    <button name="score" type="button" value="order:score_asc">Least Popular</button>
                </segmented-control>
            </div>
            <div class="section">
                <div class="section__title">Ratings</div>
                <div class="section__buttons">
                    <input type="checkbox" name="rating-safe" class="section__button section__button--safe" value="rating:safe" text="Safe">
                    <input type="checkbox" name="rating-questionable" class="section__button section__button--questionable" value="rating:questionable" text="Questionable" disabled>
                    <input type="checkbox" name="rating-explicit" class="section__button section__button--explicit" value="rating:explicit" text="Explicit" disabled>
                </div>
            </div>
            <div class="section">
                <div class="section__title">Apply</div>
                <div class="section__buttons">
                    <input type="checkbox" name="extra-blacklist" class="section__button" value="blacklist" text="Blacklist" disabled>
                    <input type="checkbox" name="extra-favorites" class="section__button" value="fav" text="Favorites" disabled>
                </div>
            </div>
            <div class="confirmation">
                <button type="button" name="cancel" class="confirmation__button" disabled>Cancel</button>
                <button type="button" name="apply" class="confirmation__button confirmation__button--apply">Apply</button>
            </div>
        </div>
    </form>

    <style>${style}</style>
`;

export class FilterMenu extends HTMLElement {
    #root;
    #elems = {};

    #internals;
    static formAssociated = true;

    constructor() {
        super();

        this.#root = this.attachShadow({ mode: 'closed', delegatesFocus: true });
        this.#root.append(template.content.cloneNode(true));
        this.#internals = this.attachInternals();
    }

    static get observedAttributes() {
        return [];
    }

    connectedCallback() {
        this.#elems.sections = this.#root.querySelectorAll('.section');
        this.#elems.dropdown = this.#root.querySelector('.section__dropdown');
        this.#elems.form = this.#root.querySelector('.filter-form');

        this.#saveOptions();

        this.#root.querySelector('.confirmation__button[name="apply"]').addEventListener('click', this.#saveOptions.bind(this));
        this.#root.querySelector('.confirmation__button[name="apply"]').addEventListener('click', this.#closeFilterMenu.bind(this));
        this.#root.querySelector('.confirmation__button[name="cancel"]').addEventListener('click', this.#closeFilterMenu.bind(this));
        this.#elems.dropdown.addEventListener('change', this.#handleDropdownChange.bind(this));
    }

    disconnectedCallback() {
        this.#root.querySelector('.confirmation__button[name="apply"]').removeEventListener('click', this.#saveOptions.bind(this));
        this.#root.querySelector('.confirmation__button[name="apply"]').removeEventListener('click', this.#closeFilterMenu.bind(this));
        this.#root.querySelector('.confirmation__button[name="cancel"]').removeEventListener('click', this.#closeFilterMenu.bind(this));
        this.#elems.dropdown.removeEventListener('change', this.#handleDropdownChange.bind(this));
    }

    attributeChangedCallback(name, oldValue, newValue) {}

    #saveOptions() {
        const formData = new FormData(this.#elems.form);
        this.#internals.setFormValue(formData);
    }

    #handleDropdownChange(event) {
        const dropdownValue = event.target.value;
        
        this.#root.querySelector('segmented-control:not([disabled])').toggleAttribute('disabled');
        this.#root.querySelector(`segmented-control[name="${dropdownValue}"]`).removeAttribute('disabled');
    }

    #closeFilterMenu() {
        this.removeAttribute('open');
    }
}
defineCustomElement('filter-menu', FilterMenu);
