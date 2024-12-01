import * as S from "../../styles/ButtonStyle";

function Button({ image, onClick }) {
  return (
    <S.ButtonLayout onClick={onClick}>
      <img src={image} alt="버튼 아이콘" />
    </S.ButtonLayout>
  );
}

export default Button;
