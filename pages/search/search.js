import { PostsTabs } from "./components/posts-tabs.js";
import { Post } from './components/post.js';
import { Gallery } from "./components/gallery.js";
import { FullView } from "./subpages/FullView/FullView.js";
import { Router } from "../../utils/router.js";

// TODO - Contain this bitchass.
function switchSubpage(subpageSwitchEvent) {
	const subpageName = subpageSwitchEvent.detail;
	const subpage = document.querySelector(`.${subpageName}:not(.search__subpage--selected)`);
	const selectedSubpage = document.querySelector('.search__subpage--selected');
	
	selectedSubpage.classList.remove('search__subpage--selected');
	subpage.classList.add('search__subpage--selected');
}

function fullView() {
	Router.getRoute({
		detail: {
			btnId: 'search',
			route: '/pages/search/subpages/FullView/full-view.html'
		}
	});

	const fullViewEvent = new Event('full-view', {
        bubbles: true,
    })

    // this.dispatchEvent(fullViewEvent);
}

document.addEventListener('switch-subpage', switchSubpage)
document.addEventListener('full-view', fullView);
