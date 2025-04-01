import useDragDrop from "hooks/useDragDrop";

import * as S from "styles/components/UploadDropZoneStyle";

import type { UploadDropZoneProps } from "types/components";

function UploadDropZone({ onUserUpload, fileTypes }: UploadDropZoneProps) {
  const {
    isDragging,
    handleFileDrop,
    handleFileDragOver,
    handleFileDragLeave,
    handleFileInputClick,
    fileInputRef,
  } = useDragDrop();

  const acceptExtensions =
    fileTypes === "마크다운·이미지"
      ? [".md", ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".svg"].toString()
      : ".tar";
  const dropZoneTitle =
    fileTypes === "마크다운·이미지" ? `${fileTypes}를 TAR로 압축하기` : "TAR에서 노트 가져오기";
  const infoText =
    fileTypes === "마크다운·이미지" ? (
      <>
        ✔ <span>압축할 {fileTypes}</span>를 <span>기본 다운로드 폴더</span>로 이동해주세요.
      </>
    ) : (
      <>
        ✔ <span>1개 이상의 마크다운</span>이 포함된 <span>TAR</span>만 업로드 가능해요.
      </>
    );

  return (
    <S.UploadDropZoneLayout
      $isDragging={isDragging}
      onDrop={(event) => handleFileDrop(event, onUserUpload)}
      onDragOver={handleFileDragOver}
      onDragLeave={handleFileDragLeave}
    >
      <h2>{dropZoneTitle}</h2>
      <S.UploadDropZoneImage $fileTypes={fileTypes} />
      <S.UploadDropZoneItem>
        <h3>
          여기에 {fileTypes}를 드래그하거나{" "}
          <span onClick={handleFileInputClick}>클릭하여 업로드</span>
          하세요.
        </h3>
        <p>{infoText}</p>
      </S.UploadDropZoneItem>
      <input
        type="file"
        accept={acceptExtensions}
        onChange={(event) => onUserUpload(event)}
        ref={fileInputRef}
        multiple
        hidden
      />
    </S.UploadDropZoneLayout>
  );
}

export default UploadDropZone;
