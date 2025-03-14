import { useLocation, useNavigate } from "react-router";

import Form from "../components/common/Form";

import useUserStore from "../stores/useUserStore";

import * as S from "../styles/PageStyle";

function ErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useUserStore();

  const isAuthenticated = Boolean(profile);
  const errorMessage = isAuthenticated
    ? location.state?.message || "유효하지 않는 URL이에요."
    : "로그인 후 이용이 가능해요.";
  const redirectPath = isAuthenticated ? location.state?.from || "/notes" : "/login";

  const buttonLabels = {
    "/login": "로그인 하러가기",
    "/notes": "메인으로 돌아가기",
  };
  const buttonMessage = buttonLabels[redirectPath] || "이전 페이지로 돌아가기";

  return (
    <S.PageLayout>
      <Form title="Notable Block">
        <S.PageMessage>{errorMessage}</S.PageMessage>
        <S.PageButton
          onClick={() => {
            navigate(redirectPath);
          }}
        >
          {buttonMessage}
        </S.PageButton>
      </Form>
    </S.PageLayout>
  );
}

export default ErrorPage;
