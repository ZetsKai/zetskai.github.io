import { hostResets } from "../../../assets/style/hostResets.js";
import { defineCustomElement } from "../../../utils/defineCustomElement.js";

const style = /*css*/`
	${hostResets}

	:host {
		display: flex;
		background-color: var(--inset-surface);
		border-bottom: 1px solid var(--border);
	}

	.tab {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-basis: 100%;
		flex-grow: 1;
		padding: var(--spacing-lg);
	}

	.tab__icon {
		height: 32px;
		width: auto;
		color: var(--icon);
	}

	.tab--selected {
		background-color: var(--surface);

		.tab__icon {
			color: var(--fill-accent-brand);
		}
	}
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
	<div class="tab tab--selected" data-subpage="general">
		<svg class="tab__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
			<!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
			<path d="M5 21h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2M8.5 7c.83 0 1.5.67 1.5 1.5S9.33 10 8.5 10 7 9.33 7 8.5 7.67 7 8.5 7M5 17.41l3-3 1.29 1.29c.39.39 1.02.39 1.41 0l5.29-5.29 3 3V19h-14v-1.59Z"></path>
		</svg>
	</div>
	<div class="tab" data-subpage="favorites">
		<svg class="tab__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
			<!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
			<path d="M11.29 20.69c.2.2.45.29.71.29s.51-.1.71-.29l7.5-7.5c2.35-2.35 2.35-6.05 0-8.41-2.29-2.29-5.84-2.35-8.21-.2-2.36-2.15-5.91-2.09-8.21.2-2.35 2.36-2.35 6.06 0 8.41z"></path>
		</svg>
	</div>
	<style>${style}</style>
`;

const SELECTED_TAB_CLASSNAME = 'tab--selected';

export class PostsTabs extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: 'open'});
		this.shadowRoot.append(template.content.cloneNode(true));

		this.tabs = this.shadowRoot.querySelectorAll('.tab');
	}

	connectedCallback() {
		this.tabs.forEach(tab => tab.addEventListener('click', this.#selectTab.bind(this)));
	}

	#selectTab(tabEvent) {
		const tab = tabEvent.currentTarget;
		if (tab.classList.contains(SELECTED_TAB_CLASSNAME)) return;

		const selectedTab = this.shadowRoot.querySelector(`.${SELECTED_TAB_CLASSNAME}`);

		selectedTab.classList.remove(SELECTED_TAB_CLASSNAME);
		tab.classList.add(SELECTED_TAB_CLASSNAME);
		
		const switchSubpageEvent = new CustomEvent('switch-subpage', {detail: tab.dataset.subpage, bubbles: true });
		this.dispatchEvent(switchSubpageEvent);
	}

	disconnectedCallback() {
		this.tabs.forEach(tab => tab.removeEventListener('click', this.#selectTab));
	}
}

defineCustomElement('posts-tabs', PostsTabs);
