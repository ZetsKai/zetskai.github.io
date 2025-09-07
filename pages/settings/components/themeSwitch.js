import { defineCustomElement } from "../../../utils/defineCustomElement.js";
import { SegmentedControl } from '../../../components/SegmentedControl.js';


export class ThemeSwitch extends SegmentedControl {
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
