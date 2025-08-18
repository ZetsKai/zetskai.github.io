export async function appendToRoot(html) {
    const rootContainer = document.querySelector('#root');
    const container = document.createElement('div');
    const htmlData = await html;

    container.innerHTML = htmlData;
    rootContainer.appendChild(container);
}
