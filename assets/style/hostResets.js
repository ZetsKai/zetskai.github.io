export const hostResets = /*css*/`
    *:not(:host), *::before, *::after {
        box-sizing: border-box;
    }

    :host, div, main, article, section, aside, footer, nav,
    h1, h2, h3, h4, h5, h6, p, a, span, button, input,
    img, video {
        padding: 0;
        margin: 0;
    }
`;
