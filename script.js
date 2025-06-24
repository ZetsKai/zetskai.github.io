import { Router } from "./router.js";
import './layout/layoutExporter.js'
import './pages/search/search.js';

const footer = document.querySelector('page-switcher');
const initialPage = footer.getBtn(0).href

window.history.replaceState({ page: initialPage, btn: footer.getBtn(0).id }, null, '');
Router.goToPage(initialPage);
footer.selectBtn(footer.getBtn(0).id)

window.addEventListener('popstate', (e) => {
    Router.goToPage(e.state.page);
    footer.selectBtn(e.state.btn)
});

document.addEventListener('switch-page', Router.getRoute);
