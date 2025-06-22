export function defineCustomElement(elemName, className) {
	if (customElements.get(elemName) === undefined)
		customElements.define(elemName, className);
	else
		console.warn('ALREADY DEFINED!');
}
