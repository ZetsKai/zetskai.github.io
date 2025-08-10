import { PostsTabs } from "./components/posts-tabs.js";
import { Post } from './components/post.js';
import { Gallery } from "./components/gallery.js";

// TODO - Contain this bitchass.
function switchSubpage(subpageSwitchEvent) {
	const subpageName = subpageSwitchEvent.detail;
	const subpage = document.querySelector(`.${subpageName}:not(.search__subpage--selected)`);
	
	const selectedSubpage = document.querySelector('.search__subpage--selected');
	
	selectedSubpage.classList.remove('search__subpage--selected');
	subpage.classList.add('search__subpage--selected');
}

setTimeout(function() {
	const imageViewContainer = document.querySelector('.image-view__container');
	const submenu = document.querySelector('.image-view__submenu');
	let amount = 0;

	document.querySelector('.image-view__exit').addEventListener('click', () => document.querySelector('.image-view').style.display = 'none');

	console.log(submenu.getBoundingClientRect().height);

	imageViewContainer.addEventListener('touchmove', (e) => {
		const tempAmount = e.touches[0].screenY;
		const currentSubmenuHeight = submenu.getBoundingClientRect().height;

		if (amount >= tempAmount) {
			console.log('up');
			submenu.style.height = `${currentSubmenuHeight + 12}px`
		};
		if (amount <= tempAmount) {
			console.log('down');
			submenu.style.height = `${currentSubmenuHeight - 12}px`
		}
		amount = tempAmount;
	});

	const downloadButton = document.querySelector('.quick-actions__btn--download');
}, 2000);

document.addEventListener('switch-subpage', switchSubpage);
