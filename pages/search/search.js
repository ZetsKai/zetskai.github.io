import { PostsTabs } from "./components/posts-tabs/posts-tabs.js";

// TODO - Contain this bitchass.
function switchSubpage(subpageSwitchEvent) {
	const searchPage = document.querySelector('.search.page');
	const subpageName = subpageSwitchEvent.detail;
	const subpage = searchPage.querySelector(`.${subpageName}`);
	const selectedSubpage = searchPage.querySelector('.search__subpage--selected');
	
	selectedSubpage.classList.remove('search__subpage--selected');
	subpage.classList.add('search__subpage--selected');
}

document.addEventListener('switch-subpage', switchSubpage);
