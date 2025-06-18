export function router(event) {
    if (event === null) return;

    const currentPageCount = window.history.state.count;
    const btn = event.currentTarget;
    const route = btn.href;

    window.history.pushState({page: route, btn: btn.id, count: (currentPageCount - 1)}, null, '');
    goToPage(route);
}

export function goToPage(route) {
    const rootContainer = document.querySelector('#root');

    fetch(route)
    .then(data => data.text())
    .then(data => rootContainer.innerHTML = data)
    .catch(error => console.log(error));
}
