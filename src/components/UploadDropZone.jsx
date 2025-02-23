import useDragDrop from "../hooks/useDragDrop";

import * as S from "../styles/UploadDropZoneStyle";

function UploadDropZone({ onUserUpload, fileTypes }) {
  const {
    isDragging,
    handleFileDrop,
    handleFileDragOver,
    handleFileDragLeave,
    handleFileInputClick,
    fileInputRef,
  } = useDragDrop();

  return (
    <S.UploadDropZoneLayout
      $isDragging={isDragging}
      onDrop={(e) => handleFileDrop(e, onUserUpload)}
      onDragOver={handleFileDragOver}
      onDragLeave={handleFileDragLeave}
    >
      <h2>{fileTypes === "마크다운" ? "마크다운을 TAR로 압축하기" : "TAR에서 노트 가져오기"}</h2>
      <S.UploadImage $isFileTypes={fileTypes} />
      <S.UploadItem>
        <h3>
          여기에 {fileTypes}
          {fileTypes === "마크다운" ? "을" : "를"} 드래그하거나{" "}
          <span onClick={handleFileInputClick}>클릭하여 업로드</span>
          하세요.
        </h3>
        <p>
          {fileTypes === "마크다운" ? (
            <>
              ✔ <span>압축할 마크다운</span>을 <span>기본 다운로드 폴더</span>로 이동해주세요.
            </>
          ) : (
            <>
              ✔ <span>1개 이상의 마크다운</span>이 포함된 <span>TAR</span>만 업로드 가능해요.
            </>
          )}
        </p>
      </S.UploadItem>
      <input
        type="file"
        accept={fileTypes === "마크다운" ? ".md" : ".tar"}
        onChange={(e) => onUserUpload(e)}
        ref={fileInputRef}
        hidden
      />
    </S.UploadDropZoneLayout>
  );
}

export default UploadDropZone;
