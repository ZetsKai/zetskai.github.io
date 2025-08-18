import { ModeSwitch } from "../../../components/modeSwitch.js";
import { defineCustomElement } from "../../../utils/defineCustomElement.js";


export class ThemeSwitch extends ModeSwitch {
    constructor() {
        super();
    }

    #changeTheme(buttonEvent) {
        const themeVal = buttonEvent.currentTarget.value
        document.querySelector('html').setAttribute('data-theme', themeVal);
    }

    connectedCallback() {
        super.connectedCallback();
        this.buttons.forEach(btn => btn.addEventListener('click', this.#changeTheme));
    }
    disconnectedCallback() {
        super.connectedCallback();
        this.buttons.forEach(btn => btn.removeEventListener('click', this.#changeTheme));
    }
}
defineCustomElement('theme-switch', ThemeSwitch);
