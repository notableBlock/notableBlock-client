import { useLocation, useNavigate } from "react-router";

import Form from "components/common/Form";

import useUserStore from "stores/useUserStore";

import * as S from "styles/pages/FormPageStyle";

interface ButtonLabelsType {
  [path: string]: string;
}

// 에러를 유발한 동적 경로를 안전한 목록 페이지로 변환하여 무한 루프 방지
const SAFE_PATHS = new Set(["/notes", "/shared", "/login", "/notes/tree"]);

function getSafeRedirectPath(from: string): string {
  if (SAFE_PATHS.has(from)) {
    return from;
  }

  // 세그먼트를 하나씩 제거하며 안전한 부모 경로 탐색
  const segments = from.split("/").filter(Boolean);

  while (segments.length > 0) {
    segments.pop();
    const parentPath = `/${segments.join("/")}`;

    if (SAFE_PATHS.has(parentPath)) {
      return parentPath;
    }
  }

  return "/notes";
}

function ErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useUserStore();

  const isAuthenticated = Boolean(profile);
  const errorMessage = isAuthenticated
    ? location.state?.message || "유효하지 않는 URL이에요."
    : "로그인 후 이용이 가능해요.";
  const rawFrom = location.state?.from || "/notes";
  const redirectPath = isAuthenticated ? getSafeRedirectPath(rawFrom) : "/login";

  const buttonLabels: ButtonLabelsType = {
    "/login": "로그인 하러가기",
    "/notes": "메인으로 돌아가기",
    "/shared": "공유 노트로 돌아가기",
    "/notes/tree": "트리 페이지로 돌아가기",
  };
  const buttonMessage = buttonLabels[redirectPath] || "이전 페이지로 돌아가기";

  return (
    <S.Layout>
      <Form title="Notable Block">
        <S.Message>{errorMessage}</S.Message>
        <S.Button
          onClick={() => {
            navigate(redirectPath);
          }}
        >
          {buttonMessage}
        </S.Button>
      </Form>
    </S.Layout>
  );
}

export default ErrorPage;
