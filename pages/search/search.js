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
	let screenScrollAmount = 0;
	let scrollThreshold = 0;

	document.querySelector('.image-view__exit').addEventListener('click', () => document.querySelector('.image-view').style.display = 'none');

	imageViewContainer.addEventListener('touchmove', (e) => {
		const touchScreenY = e.targetTouches[0].screenY;
		const currentSubmenuHeight = submenu.getBoundingClientRect().height;

		if (screenScrollAmount >= touchScreenY) {
			submenu.style.height = `${currentSubmenuHeight + 1}px`;
			scrollThreshold += 1;
		}
		if (screenScrollAmount <= touchScreenY) {
			submenu.style.height = `${currentSubmenuHeight - 1}px`;
			scrollThreshold -= 1;
		}

		console.log(scrollThreshold);
		screenScrollAmount = touchScreenY;
	});

	imageViewContainer.addEventListener('touchend', (e) => {
		if (scrollThreshold >= 50) submenu.style.height = '44%';
		else submenu.style.height = '0%';

		scrollThreshold = 0;
	});

	const downloadButton = document.querySelector('.quick-actions__btn--download');
	downloadButton.addEventListener('click', async (e) => {
		const shareData = {
			title: 'testo',
			text: 'pingo',
			url: 'https://static1.e926.net/data/6e/13/6e136ee7dbe6c1c15740ff4be5496c33.jpg'
		}

		try {
			await navigator.share(shareData);
		}
		catch (err) {
			console.log(err);
		}
	})
}, 2000);

document.addEventListener('switch-subpage', switchSubpage);
