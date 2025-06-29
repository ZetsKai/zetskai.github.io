import { hostResets } from "../../../assets/style/hostResets.js";
import { defineCustomElement } from "../../../utils/defineCustomElement.js";
import { moveSubpageIntoView } from "../../../utils/subpage.js";

const style = /*css*/`
    ${hostResets}

    :host {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        padding: var(--spacing-lg);
        gap: var(--spacing-lg);
    }
    
    :host(:hover) {
        background-color: var(--inset-surface);
    }

    ::slotted(.menu-btn), .menu-btn {
        margin-left: auto;
        color: var(--icon);
    }

    :host(.option-button--profile) {
        border-bottom: 1px solid var(--border);

        ::slotted(.icon), .icon {
            height: 64px;
            width: auto;
        }

        ::slotted(.title), .title {
            font-size: 24px;
        }

        ::slotted(.menu-btn), .menu-btn {
            height: 32px;
            width: auto;
        }
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <slot name="icon">
        <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
            <!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
            <path d="m21.16 7.86-1-1.73a1.997 1.997 0 0 0-2.73-.73l-.53.31c-.58-.46-1.22-.83-1.9-1.11V4c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v.6c-.67.28-1.31.66-1.9 1.11l-.53-.31c-.96-.55-2.18-.22-2.73.73l-1 1.73c-.55.96-.22 2.18.73 2.73l.5.29c-.05.37-.08.74-.08 1.11s.03.74.08 1.11l-.5.29c-.96.55-1.28 1.78-.73 2.73l1 1.73c.55.95 1.78 1.28 2.73.73l.53-.31c.58.46 1.22.83 1.9 1.11v.6c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-.6a8.7 8.7 0 0 0 1.9-1.11l.53.31c.96.55 2.18.22 2.73-.73l1-1.73c.55-.96.22-2.18-.73-2.73l-.5-.29c.05-.37.08-.74.08-1.11s-.03-.74-.08-1.11l.5-.29c.96-.55 1.28-1.78.73-2.73M12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4"></path>
        </svg>
    </slot>
    <slot name="title">Option Title</slot>
    <slot name="menu-btn">
        <svg class="menu-btn" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
            <!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
            <path d="m9.71 17.71 5.7-5.71-5.7-5.71-1.42 1.42 4.3 4.29-4.3 4.29z"></path>
        </svg>
    </slot>

    <style>${style}</style>
`;

export class OptionButton extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));
    }

    connectedCallback() {
        const attr = this.getAttribute('fh-to');
        if (attr !== null)
            this.addEventListener('click', () => moveSubpageIntoView(attr));
    }

    disconnectedCallback() {}
}
defineCustomElement('option-button', OptionButton);
