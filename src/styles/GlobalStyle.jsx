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
        overflow: hidden;
        height: 100%;
        background-color: ${({ theme }) => theme.color.whiteColor};
        font-size: 1rem;
        font-family: "Noto Sans KR", sans-serif;
        line-height: 1;
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
