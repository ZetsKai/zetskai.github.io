import { PostsTabs } from "./components/posts-tabs.js";
import { PostComponent } from './components/PostComponent.js';
import { PostGallery } from "./components/PostGallery.js";
import { FullView } from "./subpages/FullView/FullView.js";
import { Router } from "../../utils/router.js";
import { SearchComponent } from "./components/SearchComponent.js";
import { FilterMenu } from "./components/FilterMenu.js";
import { sanitizeTagString } from '../../utils/sanitizeTagString.js';

// TODO - Contain this bitchass.
function switchSubpage(subpageSwitchEvent) {
	const subpageName = subpageSwitchEvent.detail;
	const subpage = document.querySelector(`.${subpageName}:not(.search__subpage--selected)`);
	const selectedSubpage = document.querySelector('.search__subpage--selected');
	
	selectedSubpage.classList.remove('search__subpage--selected');
	subpage.classList.add('search__subpage--selected');
}

const storePostsData = postsDataEvent => document.querySelector('full-view').postsData = postsDataEvent.detail;

function openInFullView(postEvent) {
	const postIndex = postEvent.detail;
	const fullView = document.querySelector('full-view');

	fullView.openFullView(postIndex);
}

function initiateSearch() {
	const favorites = 'fav:ZetsKai';
	const blacklist = 'cheating raceplay cub'.split(' ').map(tag => '-' + tag).join(' ');

	const form = document.querySelector('.search-area');
	const formData = new FormData(form);

	let searchString = '';
	for (const [key, value] of formData.entries()) {
		let string;
		if (key === 'extra-blacklist') string = blacklist;
		else if (key === 'extra-favorites') string = favorites;
		else string = value

		console.log(`${key}: ${value}.`);
		searchString += sanitizeTagString(string);
	}

	const gallery = document.querySelector('post-gallery');
	console.log(searchString);
	gallery.getImages(searchString);
}

document.addEventListener('search-component-search', initiateSearch);
document.addEventListener('openFilterMenu', () => {
	document.querySelector('filter-menu').setAttribute('open', '');
});

// document.addEventListener('switch-subpage', switchSubpage);
document.addEventListener('fullView', openInFullView);
document.addEventListener('fetchedPosts', storePostsData);
