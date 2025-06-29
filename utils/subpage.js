const subpages = [];

export const pushHistory = subpage => subpages.push(subpage);
export const popHistory = () => subpages.pop();

export function moveSubpageIntoView(subpageId) {
    const subpage = document.querySelector(`#${subpageId}.subpage`);
    console.log(subpage);
    if (subpage == undefined) return;

    const page = document.querySelector('.page');

    subpage.classList.add('subpage--visible')
    page.scrollTo({
        left: subpage.getBoundingClientRect().left,
        behavior: 'smooth'
    });
}
