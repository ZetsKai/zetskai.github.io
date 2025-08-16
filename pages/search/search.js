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
	let oldFingerPosY = 0;
	let newHeight = 0;

	async function changeHeight() {
		submenu.style.height = newHeight;
	}

	document.querySelector('.image-view__exit').addEventListener('click', () => document.querySelector('.image-view').style.display = 'none');

	imageViewContainer.addEventListener('touchmov', (e) => {
		const currentFingerPosY = e.touches[0].screenY;
		const currentSubmenuHeight = submenu.getBoundingClientRect().height;
		const calculation = oldFingerPosY - (currentFingerPosY);

		newHeight = `${currentSubmenuHeight + calculation}px`;
		oldFingerPosY = currentFingerPosY;
		requestAnimationFrame(changeHeight);
	}, { passive: true });

	imageViewContainer.addEventListener('touchen', () => {
		const currentSubmenuHeight = submenu.getBoundingClientRect().height;
		const heightPercent = window.innerHeight * 0.25;
		
		if (currentSubmenuHeight > heightPercent) submenu.style.height = '44%';
		else if (currentSubmenuHeight <= heightPercent) submenu.style.height = '0%';
	});

	async function downloadImage() {
		const src = 'https://static1.e926.net/data/6e/13/6e136ee7dbe6c1c15740ff4be5496c33.jpg';
 		const image = await fetch(src);
 		const imageBlog = await image.blob();
 		const imageURL = URL.createObjectURL(imageBlog);

		const link = document.createElement('a')
 		link.href = imageURL
 		link.download = 'foxcrow-test.jpg'
 		document.body.appendChild(link)
 		link.click()
 		document.body.removeChild(link)
	}

	const downloadButton = document.querySelector('.quick-actions__btn--download');
	downloadButton.addEventListener('click', (e) => {
		console.log('downloading?');
		downloadImage();
	});
}, 2000);

document.addEventListener('switch-subpage', switchSubpage);
