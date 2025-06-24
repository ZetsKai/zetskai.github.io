import { Router } from './router.js';
import { MenuHeader } from './layout/menuHeader.js';
import { Footer } from './layout/footer.js'
import './pages/search/search.js';

const footer = document.querySelector('page-switcher');
let initialPage = footer.shadowRoot.querySelector(`#search`);

window.history.replaceState({ page: initialPage.href, btn: initialPage.id }, null, '');
Router.goToPage(initialPage);
footer.selectBtn(initialPage.id);

window.addEventListener('popstate', (e) => {
    Router.goToPage(e.state.page);
    footer.selectBtn(e.state.btn)
});

document.addEventListener('switch-page', Router.getRoute);
