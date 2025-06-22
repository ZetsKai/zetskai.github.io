export class PostsTabs extends HTMLElement {
	constructor() {
		super();

		this.tabs = null;

		this.attachShadow({ mode: 'open'});
	}

	connectedCallback() {
		const template = document.getElementById('posts-tabs').content;
		this.shadowRoot.appendChild(template.cloneNode(true));

		this.tabs = this.shadowRoot.querySelectorAll('.tab');
		this.tabs.forEach(tab => tab.addEventListener('click', this.selectTab.bind(this)));
	}

	selectTab(tabEvent) {
		const TAB_CLASSNAME = 'tab--selected';
		const tab = tabEvent.currentTarget;
		const selectedTab = this.shadowRoot.querySelector(`.${TAB_CLASSNAME}`);

		selectedTab.classList.remove(TAB_CLASSNAME);
		tab.classList.add(TAB_CLASSNAME);
		
		const postSwitchEvent = new CustomEvent('postSwitch', {detail: tab.dataset.subpage})
		document.dispatchEvent(postSwitchEvent)
	}

	disconnectedCallback() {
		console.log('disconnected');

		this.tabs.forEach(tab => tab.removeEventListener('click', this.selectTab));
	}
}
