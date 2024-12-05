import * as S from "../../styles/ButtonStyle";

function Button({ image, onClick }) {
  return (
    <S.ButtonLayout onClick={onClick}>
      <S.ButtonImage $image={image} />
    </S.ButtonLayout>
  );
}

export default Button;
