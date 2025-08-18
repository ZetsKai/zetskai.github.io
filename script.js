import { Router } from './utils/router.js';
import { appendToRoot } from './pages/root.js';
import { requestSpecificPost } from "./utils/requestPosts.js";


import './components/components.js';
import './layout/layout.js';
import './pages/pages.js';

const footer = document.querySelector('page-switcher');
let initialPage = footer.shadowRoot.querySelector(`#search`);

window.history.replaceState({ page: initialPage.href, btn: initialPage.id }, null, '');
Router.goToPage(initialPage);
footer.selectBtn(initialPage.id);

window.addEventListener('popstate', (e) => {
    Router.goToPage(e.state.page);
    footer.selectBtn(e.state.btn);
});

document.addEventListener('switch-page', Router.getRoute);
