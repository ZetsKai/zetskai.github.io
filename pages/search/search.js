import { defineCustomElement } from "../../utils/defineCustomElement.js";
import { PostsTabs } from "./components/posts-tabs/posts-tabs.js";

function switchSubpage(subpageSwitchEvent) {
	const subpageName = subpageSwitchEvent.detail;
	const searchPage = document.querySelector('.search');
	const subpage = searchPage.querySelector(`.${subpageName}`);
	const selectedSubpage = searchPage.querySelector('.search__subpage--selected');
	
	selectedSubpage.classList.remove('search__subpage--selected');
	subpage.classList.add('search__subpage--selected');
}

document.addEventListener('postSwitch', switchSubpage);
defineCustomElement('posts-tabs', PostsTabs);


// export class SearchPage extends HTMLElement {
// 	constructor() {
// 		super();

// 		this.attachShadow({ mode: 'open' });
// 	}

// 	connectedCallback() {
// 		const template = document.querySelector('#search-page').content;
// 		this.shadowRoot.appendChild(template);

// 		defineCustomElement('posts-tabs', PostsTabs);
// 		this.shadowRoot.addEventListener('postSwitch', this.switchSubpage.bind(this));
// 	}

// 	disconnectedCallback() {

// 	}

// 	switchSubpage(subpageName) {
// 		const subpage = this.shadowRoot.querySelector(`.${subpageName}`);
// 		const selectedSubpage = this.shadowRoot.querySelector('.subpage--selected');

// 		selectedSubpage.classList.remove('subpage--selected');
// 		subpage.classList.add('subpage--selected');
// 	}
// }
