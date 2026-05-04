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

    /* styled-reset이 의미 태그의 user-agent default를 제거하므로 인라인 포맷용으로 복구 */
    strong, b {
        font-weight: bold;
    }

    em, i {
        font-style: italic;
    }

    /* 인라인 code(Cmd+E로 삽입)에만 적용 — 코드 블록(tag === "code")은
       NoteBlockStyle/NoteViewerStyle의 자식 selector가 더 높은 specificity로 override */
    code {
        font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
        font-size: 0.9em;
        padding: 0.125rem 0.25rem;
        background-color: rgba(135, 131, 120, 0.15);
        border-radius: 0.25rem;
        color: #c7254e;
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
