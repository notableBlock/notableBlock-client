import styled from "styled-components";

const UserPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 5rem;
  gap: 3rem;
`;

const UserPageItem = styled.div`
  ${({ $type }) =>
    $type === "option"
      ? `
    position: absolute;
    right: 3rem;
    bottom: 3rem;`
      : `
      display: flex;
      gap: 1.5rem;
    `}
`;

export { UserPageLayout, UserPageItem };
