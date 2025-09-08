import { defineCustomElement } from "../../../../../utils/defineCustomElement.js";
import { hostResets } from "../../../../../assets/style/hostResets.js";
import { store } from "../../../../../utils/store.js";
const style = /*css*/`
    ${hostResets}

    :host {
        flex-shrink: 0;
        min-height: 0;
        max-height: 44%;
        height: 0%;
        // padding: var(--spacing-lg);
        padding: 0;
        border-radius: 8px 8px 0 0;
        background-color: var(--surface);
        border-top: 1px solid var(--border);
        overflow: hidden;
        /* transition: height 1s linear; */
    }
    :host(.submenu--open) {
        padding: var(--spacing-lg);
    }

    .link-dump { display: none !important; }

    .quick-actions {
        display: flex;
        gap: var(--spacing-lg);
        padding-bottom: var(--spacing-lg);
        border-bottom: 1px solid var(--border);
    }

    .quick-actions__button {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-md);
        flex-basis: 100%;
        padding: var(--spacing-md);
        border-radius: 8px;
        background-color: var(--inset-surface);
        border: 1px solid var(--border);
        color: var(--icon);
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <a class="link-dump" href="" download>If this is visible, there is a severe problem!</a>
    <nav class="quick-actions">
        <button class="quick-actions__button quick-actions__button--url">
            <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
                <!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
                <path d="M9.88 18.36a3 3 0 0 1-4.24 0 3 3 0 0 1 0-4.24l2.83-2.83-1.41-1.41-2.83 2.83a5.003 5.003 0 0 0 0 7.07c.98.97 2.25 1.46 3.54 1.46s2.56-.49 3.54-1.46l2.83-2.83-1.41-1.41-2.83 2.83ZM12.71 4.22 9.88 7.05l1.41 1.41 2.83-2.83a3 3 0 0 1 4.24 0 3 3 0 0 1 0 4.24l-2.83 2.83 1.41 1.41 2.83-2.83a5.003 5.003 0 0 0 0-7.07 5.003 5.003 0 0 0-7.07 0Z"></path><path d="m16.95 8.46-.71-.7-.7-.71-4.25 4.24-4.24 4.25.71.7.7.71 4.25-4.24z"></path>
            </svg>
            <p class="quick-actions__button-title">URL</p>
        </button>
        <button class="quick-actions__button quick-actions__button--download">
            <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
                <!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
                <path d="M5 21h14c1.1 0 2-.9 2-2V8c0-.27-.11-.52-.29-.71l-4-4A1 1 0 0 0 16 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2M7 5h4v2h2V5h2v4H7zm0 8c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v6H7z"></path>
            </svg>
            <p class="quick-actions__button-title">Save</p>
        </button>
        <button class="quick-actions__button quick-actions__button--flag">
            <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
                <!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
                <path d="M5 15.64c2-.87 4.28-.76 6.18.33 1.37.78 2.89 1.18 4.42 1.18 1.12 0 2.24-.21 3.32-.64l1.45-.58A1 1 0 0 0 21 15V4c0-.33-.17-.64-.44-.83a1 1 0 0 0-.93-.1l-1.45.58c-1.97.79-4.16.63-6-.42A8.9 8.9 0 0 0 3.77 3l-.21.1a1 1 0 0 0-.55.89v18h2v-6.36Z"></path>
            </svg>
            <p class="quick-actions__button-title">Report</p>
        </button>
    </nav>
    <div class="expander">Description</div>
    <div class="expander">Comments</div>

    <style>${style}</style>
`;

export class Submenu extends HTMLElement {
    #root;
    #elems = {}; // linkDump, urlButton, downloadButton, flagButton
    constructor() {
        super();

        this.#root = this.attachShadow({ mode: 'closed' });
        this.#root.append(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['url', 'id', 'ext'];
    }

    connectedCallback() {
        this.#elems.linkDump = this.#root.querySelector('.link-dump');
        this.#elems.urlButton = this.#root.querySelector('.quick-actions__button--url');
        this.#elems.downloadButton = this.#root.querySelector('.quick-actions__button--download');

        this.#elems.downloadButton.addEventListener('click', this.#downloadImage.bind(this));
        this.#elems.urlButton.addEventListener('click', this.#copyToClipboard.bind(this));
    }

    disconnectedCallback() {
        this.#elems.downloadButton.removeEventListener('click', this.#downloadImage.bind(this));
        this.#elems.urlButton.removeEventListener('click', this.#copyToClipboard.bind(this));
    }

    setHeight(fingerPosCalculation) {
        this.classList.add('submenu--open')
        const currentSubmenuHeight = this.getBoundingClientRect().height;
        let newHeight;

        if (fingerPosCalculation == undefined) {
            const halfHeight = (window.innerHeight * 0.44) * 0.5;

            if (currentSubmenuHeight > halfHeight) {
                newHeight = '44%';
                this.classList.add('submenu--open')
            }
		    else if (currentSubmenuHeight <= halfHeight) {
                newHeight = '0%';
                this.classList.remove('submenu--open');
            }
        }
        else newHeight = `${currentSubmenuHeight + fingerPosCalculation}px`;

        requestAnimationFrame(() => this.style.height = `${newHeight}`);
    }
    tempReset() {
        this.classList.remove('submenu--open');
        this.style.height = '0%';
    }

    async #downloadImage() {
        console.log(this.getAttribute('url'));
 		const image = await fetch(this.getAttribute('url'));
 		const imageBlob = await image.blob();
 		const imageUrl = URL.createObjectURL(imageBlob);

 		this.#elems.linkDump.href = imageUrl;
 		this.#elems.linkDump.download = `foxhole-e621-post_${this.getAttribute('id')}.${this.getAttribute('ext')}`;
 		this.#elems.linkDump.click();
	}

    #copyToClipboard() {
        navigator.clipboard.writeText(this.getAttribute('url'));
    }
}
defineCustomElement('sub-menu', Submenu);
