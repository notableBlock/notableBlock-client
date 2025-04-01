import * as S from "styles/components/LoadingStyle";

function Loading() {
  return (
    <S.LoadingLayout>
      <p>잠시만 기다려주세요.</p>
      <S.LoadingImage />
    </S.LoadingLayout>
  );
}

export default Loading;
