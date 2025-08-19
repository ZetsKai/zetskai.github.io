import { hostResets } from "../../../../assets/style/hostResets.js";
import { defineCustomElement } from "../../../../utils/defineCustomElement.js";

const style = /*css*/`
    ${hostResets}

    :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background-color: var(--inset-surface);
    }
    .link-dump { display: none !important; }

    .header {
        display: flex;
        overflow: hidden;
        justify-content: space-between;
        align-items: center;
        min-height: 0;
        flex-shrink: 0;
        padding: var(--spacing-xl);
        background-color: var(--surface);
        border-bottom: 1px solid var(--border);
        color: var(--icon);
    }

    .header__exit, .header__info-btn {
        background-color: transparent;
        border: unset;
        color: inherit;
    }

    .header__id {
        min-width: 0;
        flex-shrink: 1;
    }

    .image-container {
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        min-height: 0;
        flex-basis: 100%;
        flex-grow: 1;
        padding: var(--spacing-xl);
    }

    .image-container__image {
        max-width: 100%;
        max-height: 100%;
        border-radius: 8px;
        border: 1px solid var(--border);
    }

    .score-fav {
        display: flex;
        position: absolute;
        bottom: var(--spacing-xl);
        justify-content: space-between;
        width: 100%;
        padding-inline: var(--spacing-xl);
        color: white;
    }

    .score-fav__score, .score-fav__fav-button {
        border-radius: 100px;
        background-color: #00000080;
    }

    .score-fav__score {
        display: flex;
        align-items: center;
        overflow: hidden;
    }

    .score-fav__score-button, .score-fav__fav-button {
        padding: var(--spacing-lg);
        color: white;
        outline: unset;
        border: unset;
    }

    .score-fav__score-button {
        background-color: transparent;
    }

    .score-fav__fav-button {
        background-color: #00000080;
    }

    .submenu {
        flex-shrink: 0;
        min-height: 0;
        max-height: 44%;
        height: 0%;
        padding: var(--spacing-lg);
        border-radius: 8px 8px 0 0;
        background-color: var(--surface);
        border-top: 1px solid var(--border);
        overflow: hidden;
        /* transition: height 1s linear; */
    }

    .quick-actions {
        display: flex;
        gap: var(--spacing-lg);
        padding-bottom: var(--spacing-lg);
        border-bottom: 1px solid var(--border);
    }

    .quick-actions__button {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-md);
        flex-basis: 100%;
        padding: var(--spacing-md);
        border-radius: 8px;
        background-color: var(--inset-surface);
        border: 1px solid var(--border);
        color: var(--icon);
    }

    :host(.full-view--fullscreen) {
        background-color: black;

        .header {
            flex-basis: 0;
            padding: 0;
        }

        .image-container {
            padding: 0;
        }

        .image-container__image {
            border-radius: unset;
            border: unset;
        }

        .score-fav {
            display: none;
        }

        .submenu {
            padding: 0;
        }
    }
`;

const template = document.createElement('template');
template.innerHTML = /*html*/`
    <div class="link-dump"></div>
    <div class="header">
        <button class="header__exit">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
                <!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
                <path d="m9.88 12.71-4.95 4.95 1.41 1.41 2.83-2.83L12 13.41l2.12 2.13 3.54 3.53 1.41-1.41-4.95-4.95-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12z"></path>
            </svg>
        </button>
        <div class="header__id">
            <span class="full-view__id-logo" style="font-weight: bolder;">ID</span>
            <span class="full-view__id-num">99999</span>
        </div>
        <button class="header__info-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
                <!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
                <path d="M12 22c5.51 0 10-4.49 10-10S17.51 2 12 2 2 6.49 2 12s4.49 10 10 10M11 7h2v2h-2zm0 4h2v6h-2z"></path>
            </svg>
        </button>
    </div>
    <div class="image-container">
        <img class="image-container__image" src="https://static1.e926.net/data/6e/13/6e136ee7dbe6c1c15740ff4be5496c33.jpg" alt="" />
        <div class="score-fav">
            <div class="score-fav__score">
                <button class="score-fav__score-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
                        <!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
                        <path d="M12.87 3.51c-.35-.63-1.39-.63-1.74 0l-9 16c-.17.31-.17.69 0 1s.51.5.86.5h18c.36 0 .68-.19.86-.5s.18-.69 0-1z"></path>
                    </svg>
                </button>
                <div class="score-fav__counter">99999+</div>
                <button class="score-fav__score-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
                        <!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
                        <path d="M12.87 3.51c-.35-.63-1.39-.63-1.74 0l-9 16c-.17.31-.17.69 0 1s.51.5.86.5h18c.36 0 .68-.19.86-.5s.18-.69 0-1z"></path>
                    </svg>
                </button>
            </div>
            <button class="score-fav__fav-button">
                <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
                    <!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
                    <path d="M11.29 20.69c.2.2.45.29.71.29s.51-.1.71-.29l7.5-7.5c2.35-2.35 2.35-6.05 0-8.41-2.29-2.29-5.84-2.35-8.21-.2-2.36-2.15-5.91-2.09-8.21.2-2.35 2.36-2.35 6.06 0 8.41z"></path>
                </svg>
            </button>
        </div>
    </div>
    <div class="submenu">
        <nav class="quick-actions">
            <button class="quick-actions__button">
                <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
                    <!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
                    <path d="M9.88 18.36a3 3 0 0 1-4.24 0 3 3 0 0 1 0-4.24l2.83-2.83-1.41-1.41-2.83 2.83a5.003 5.003 0 0 0 0 7.07c.98.97 2.25 1.46 3.54 1.46s2.56-.49 3.54-1.46l2.83-2.83-1.41-1.41-2.83 2.83ZM12.71 4.22 9.88 7.05l1.41 1.41 2.83-2.83a3 3 0 0 1 4.24 0 3 3 0 0 1 0 4.24l-2.83 2.83 1.41 1.41 2.83-2.83a5.003 5.003 0 0 0 0-7.07 5.003 5.003 0 0 0-7.07 0Z"></path><path d="m16.95 8.46-.71-.7-.7-.71-4.25 4.24-4.24 4.25.71.7.7.71 4.25-4.24z"></path>
                </svg>
                <p class="quick-actions__button-title">URL</p>
            </button>
            <button class="quick-actions__button quick-actions__button--download">
                <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
                    <!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
                    <path d="M5 21h14c1.1 0 2-.9 2-2V8c0-.27-.11-.52-.29-.71l-4-4A1 1 0 0 0 16 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2M7 5h4v2h2V5h2v4H7zm0 8c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v6H7z"></path>
                </svg>
                <p class="quick-actions__button-title">Save</p>
            </button>
            <button class="quick-actions__button">
                <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
                    <!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
                    <path d="M5 15.64c2-.87 4.28-.76 6.18.33 1.37.78 2.89 1.18 4.42 1.18 1.12 0 2.24-.21 3.32-.64l1.45-.58A1 1 0 0 0 21 15V4c0-.33-.17-.64-.44-.83a1 1 0 0 0-.93-.1l-1.45.58c-1.97.79-4.16.63-6-.42A8.9 8.9 0 0 0 3.77 3l-.21.1a1 1 0 0 0-.55.89v18h2v-6.36Z"></path>
                </svg>
                <p class="quick-actions__button-title">Report</p>
            </button>
        </nav>
        <div class="expander">Description</div>
        <div class="expander">Comments</div>
    </div>

    <style>${style}</style>
`;

export class FullView extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));
    }

    connectedCallback() {
        const container = this.shadowRoot.querySelector('.image-container');
	    const submenu = this.shadowRoot.querySelector('.submenu');
	    let oldFingerPosY = 0;
	    let newHeight = 0;

        const changeHeight = () => submenu.style.height = newHeight;

	    container.addEventListener('touchmove', (e) => {
	    	const currentFingerPosY = e.touches[0].screenY;
	    	const currentSubmenuHeight = submenu.getBoundingClientRect().height;
	    	const calculation = oldFingerPosY - (currentFingerPosY);

	    	newHeight = `${currentSubmenuHeight + calculation}px`;
	    	oldFingerPosY = currentFingerPosY;
	    	requestAnimationFrame(changeHeight);
	    }, { passive: true });

	    container.addEventListener('touchend', () => {
		    const currentSubmenuHeight = submenu.getBoundingClientRect().height;
		    const heightPercent = window.innerHeight * 0.25;

		    if (currentSubmenuHeight > heightPercent) submenu.style.height = '44%';
		    else if (currentSubmenuHeight <= heightPercent) submenu.style.height = '0%';
	    });

    	const downloadButton = this.shadowRoot.querySelector('.quick-actions__button--download');
        downloadButton.addEventListener('click', (e) => {
		    console.log('downloading?');
		    downloadImage();
	    });

	    this.shadowRoot.querySelector('.header__exit').addEventListener('click', () => history.back());
        container.addEventListener('click', this.fullscreen.bind(this));
		// container.addEventListener('click', () => requestAnimationFrame(this.fullscreem));
    }

    disconnectedCallback() {
        console.log('bye <full-view!/>');
    }

    fullscreen() {
        this.classList.toggle('full-view--fullscreen');
		this.style.visibility = 'hidden';
		this.offsetHeight;
	    this.style.visibility = 'unset';
    }

    async downloadImage() {
        const linkDump = this.shadowRoot.querySelector('.link-dump');
		const src = 'https://static1.e926.net/data/6e/13/6e136ee7dbe6c1c15740ff4be5496c33.jpg';
 		const image = await fetch(src);
 		const imageBlog = await image.blob();
 		const imageURL = URL.createObjectURL(imageBlog);

		const link = document.createElement('a')
 		link.href = imageURL
 		link.download = 'foxcrow-test.jpg'
 		linkDump.appendChild(link)
 		link.click()
 		linkDump.removeChild(link)
	}
}
defineCustomElement('full-view', FullView);
