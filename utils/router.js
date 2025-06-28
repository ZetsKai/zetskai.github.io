export class Router {
    static getRoute(event) {
        if (event === null) return;

        const btnId = event.detail.btnId;
        const route = event.detail.route;

        window.history.pushState({page: route, btn: btnId }, null, '');
        Router.goToPage(route);
    }

    static goToPage(route) {
        const rootContainer = document.querySelector('#root');

        fetch(route)
        .then(data => data.text())
        .then(htmlData => rootContainer.innerHTML = htmlData)
        .catch(error => console.log(error));
    }
}
