import styled from "styled-components";

interface CommonNotePageItemProps {
  $isOption?: boolean;
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 5rem;
  gap: 3rem;

  @media screen and (max-width: 768px) {
    margin: 3rem 0 3rem 0;
  }
`;

const Item = styled.div<CommonNotePageItemProps>`
  ${({ $isOption }) =>
    $isOption
      ? `
    position: absolute;
    right: 3rem;
    bottom: 3rem;`
      : `
      display: flex;
      justify-content: center;
      align-items: center;;
      gap: 1.5rem;
    `}
`;

export { Layout, Item };
