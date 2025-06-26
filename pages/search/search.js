import { PostsTabs } from "./components/posts-tabs.js";
import { Post } from './components/post.js';
import { Gallery } from "./components/gallery.js";

// TODO - Contain this bitchass.
function switchSubpage(subpageSwitchEvent) {
	const searchPage = document.querySelector('.search.page');
	const subpageName = subpageSwitchEvent.detail;
	const subpage = searchPage.querySelector(`.${subpageName}:not(.search__subpage--selected)`);
	console.log(subpage);
	
	const selectedSubpage = searchPage.querySelector('.search__subpage--selected');
	
	selectedSubpage.classList.remove('search__subpage--selected');
	subpage.classList.add('search__subpage--selected');
}

document.addEventListener('switch-subpage', switchSubpage);
