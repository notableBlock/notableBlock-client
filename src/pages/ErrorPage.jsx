import { useLocation, useNavigate } from "react-router";

import Form from "../components/common/Form";

import * as S from "../styles/PageStyle";

function ErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { message } = location.state || "";

  return (
    <S.PageLayout>
      <Form title="Notable Block">
        <S.PageMessage>{message || "유효하지 않는 URL입니다."}</S.PageMessage>
        <S.PageButton
          onClick={() => {
            navigate(-1);
          }}
        >
          이전 페이지로 돌아가기
        </S.PageButton>
      </Form>
    </S.PageLayout>
  );
}

export default ErrorPage;
