const subpages = [];

export const pushHistory = subpage => subpages.push(subpage);
export const popHistory = () => subpages.pop();

export function moveSubpageIntoView(subpageId) {
    const subpage = document.querySelector(`#${subpageId}.subpage`);
    if (subpage == undefined) return;

    
    subpage.classList.add('subpage--visible')
    const location = subpage.getBoundingClientRect().left;
    const page = document.querySelector('.page');

    page.scrollBy({
        left: location,
        behavior: 'smooth'
    });
}

export function hideSubpage() {
    const subpages = document.querySelectorAll('.subpage--visible');
    if (subpages.length <= 1) return;
    
    const page = document.querySelector('.page');
    const lastSubpage = subpages[subpages.length - 2];

    page.scrollBy({
        left: lastSubpage.getBoundingClientRect().left,
        behavior: 'smooth'
    })

    setTimeout(() => subpages[subpages.length - 1].classList.remove('subpage--visible'), 500);
}
