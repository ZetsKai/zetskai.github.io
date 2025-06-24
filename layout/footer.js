import { defineCustomElement } from "../utils/defineCustomElement.js";

const style = /*css*/`
    :host {
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }

        display: flex;
        justify-content: center;
        padding: var(--spacing-lg);
        padding-bottom: calc(var(--spacing-lg) + 13px);
        background-color: var(--light-surface);
        border-top: 1px solid var(--light-border);
    }

    .btn {
        display: flex;
        justify-content: center;
        flex-basis: 100%;
        flex-grow: 1;
        color: var(--light-icon);

        &[data-selected] { color: var(--fill-accent-brand) !important; }
    }

    .icon {
        height: 32px;
        width: auto;
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
	<a id="search" class="btn" href="/pages/search/search.html">
		<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
			<!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
			<path d="m18,10c0-4.41-3.59-8-8-8S2,5.59,2,10s3.59,8,8,8c1.85,0,3.54-.63,4.9-1.69l5.1,5.1,1.41-1.41-5.1-5.1c1.05-1.36,1.69-3.05,1.69-4.9Zm-14,0c0-3.31,2.69-6,6-6s6,2.69,6,6-2.69,6-6,6-6-2.69-6-6Z"></path>
		</svg>
	</a>
	<a id="upload" class="btn" href="/pages/in-development/in-development.html">
		<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
			<!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
			<path d="M13 16V9h4l-5-6-5 6h4v7z"></path><path d="M19 19H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2z"></path>
		</svg>
	</a>
	<a id="social" class="btn" href="/pages/in-development/in-development.html">
	   <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
		   <!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
		   <path d="M12 5A3 3 0 1 0 12 11 3 3 0 1 0 12 5z"></path><path d="m13,12h-2c-2.76,0-5,2.24-5,5v.5c0,.83.67,1.5,1.5,1.5h9c.83,0,1.5-.67,1.5-1.5v-.5c0-2.76-2.24-5-5-5Z"></path><path d="m6.5,11c.47,0,.9-.12,1.27-.33-.48-.77-.77-1.68-.77-2.67,0-.66.13-1.28.35-1.85-.26-.09-.55-.15-.85-.15-1.44,0-2.5,1.06-2.5,2.5s1.06,2.5,2.5,2.5Z"></path><path d="m6.11,12h-.61c-1.93,0-3.5,1.57-3.5,3.5v1c0,.28.22.5.5.5h1.5c0-1.96.81-3.73,2.11-5Z"></path><path d="m17.5,11c1.44,0,2.5-1.06,2.5-2.5s-1.06-2.5-2.5-2.5c-.31,0-.59.06-.85.15.22.57.35,1.19.35,1.85,0,.99-.29,1.9-.77,2.67.37.21.79.33,1.27.33Z"></path><path d="m18.5,12h-.61c1.3,1.27,2.11,3.04,2.11,5h1.5c.28,0,.5-.22.5-.5v-1c0-1.93-1.57-3.5-3.5-3.5Z"></path>
		</svg>
	</a>
	<a id="settings" class="btn" href="/pages/settings/settings.html">
		<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
			<!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
			<path d="m21.16 7.86-1-1.73a1.997 1.997 0 0 0-2.73-.73l-.53.31c-.58-.46-1.22-.83-1.9-1.11V4c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v.6c-.67.28-1.31.66-1.9 1.11l-.53-.31c-.96-.55-2.18-.22-2.73.73l-1 1.73c-.55.96-.22 2.18.73 2.73l.5.29c-.05.37-.08.74-.08 1.11s.03.74.08 1.11l-.5.29c-.96.55-1.28 1.78-.73 2.73l1 1.73c.55.95 1.78 1.28 2.73.73l.53-.31c.58.46 1.22.83 1.9 1.11v.6c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-.6a8.7 8.7 0 0 0 1.9-1.11l.53.31c.96.55 2.18.22 2.73-.73l1-1.73c.55-.96.22-2.18-.73-2.73l-.5-.29c.05-.37.08-.74.08-1.11s-.03-.74-.08-1.11l.5-.29c.96-.55 1.28-1.78.73-2.73M12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4"></path>
		</svg>
	</a>

    <style>${style}</style>
`;

export class Footer extends HTMLElement {
    #btns;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));

        this.#btns = this.shadowRoot.querySelectorAll('.btn');
    }

    connectedCallback() {
        this.#btns.forEach(btn => btn.addEventListener('click', this.handleClick.bind(this)))
    }

    handleClick(btn_event) {
        btn_event.preventDefault();
        const btn = btn_event.currentTarget;
        if (btn.dataset.selected !== undefined) return null;

        this.selectBtn(btn.id)

        const switchPageEvent = new CustomEvent('switch-page', {
            bubbles: true,
            composed: true,
            detail: {
                btnId: btn.id,
                route: btn.href
            }
        });
        btn.dispatchEvent(switchPageEvent);
    }

    selectBtn(btnId) {
        const btn = this.shadowRoot.getElementById(btnId);
        const selectedBtn = this.shadowRoot.querySelector('[data-selected]');

        if (selectedBtn !== null) delete selectedBtn.dataset.selected
        btn.dataset.selected = '';
    }
}

defineCustomElement('page-switcher', Footer)
