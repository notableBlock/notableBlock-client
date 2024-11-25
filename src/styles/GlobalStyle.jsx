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

    a {
        text-decoration: none;
        color: inherit;
    }

    body {
        height: 100%;
        font-size: 1rem;
        line-height: 1;
        font-family: 'Noto Sans KR', sans-serif;
        background-color: ${({ theme }) => theme.color.whiteColor};
    }

    ol, ul {
        list-style: none;
    }

    button {
        border: 0;
        background: transparent;
        cursor: pointer;
    }
`;

export default GlobalStyle;
