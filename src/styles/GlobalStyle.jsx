import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset}

    * {
        box-sizing: border-box;
        text-align: center;
    }

    html {
        height: 100%;
    }

    body {
        height: 100%;
        font-size: 1rem;
        line-height: 1;
        font-family: "Noto Sans KR", sans-serif;
        background-color: ${({ theme }) => theme.color.whiteColor};
    }

    h1 {
        font-size: 2em;
        font-weight: bold;
    }

    h2 {
        font-size: 1.5rem;
        font-weight: bold;
    }

    h3 {
        font-size: 1.17em;
        font-weight: bold;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    ol, ul {
        list-style: none;
    }

    button {
        border: 0;
        background-color: transparent;
        cursor: pointer;
    }
`;

export default GlobalStyle;
