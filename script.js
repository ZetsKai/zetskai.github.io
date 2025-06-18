import { router, goToPage } from "./router.js";
import { handleClick, setSelectedBtn } from "./layout/footer/footer.js";

const footerBtns = document.querySelectorAll('.footer__btn');
const initialPage = footerBtns[0].href;

footerBtns.forEach(btn => btn.addEventListener('click', (e) => router(handleClick(e))));

// if (window.history.state.count != undefined) window.history.go(window.history.state.count);

window.history.replaceState({page: initialPage, btn: footerBtns[0].id, count: 0}, null, '');
goToPage(initialPage);

window.addEventListener('popstate', (e) => {
    goToPage(e.state.page);
    setSelectedBtn(e.state.btn);
});
