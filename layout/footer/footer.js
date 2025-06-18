export function handleClick(btn_event) {
    btn_event.preventDefault();
    const btn = btn_event.currentTarget;;

    if (btn.classList.contains('footer__btn--selected')) return null;

    setSelectedBtn(btn.id)
    return btn_event
}

export function setSelectedBtn(btnId) {
    const btn = document.getElementById(btnId);
    const selectedBtn = document.querySelector('.footer__btn--selected');

    selectedBtn.classList.remove('footer__btn--selected')
    btn.classList.add('footer__btn--selected')
}
