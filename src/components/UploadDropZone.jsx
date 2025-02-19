import useDragDrop from "../hooks/useDragDrop";

import * as S from "../styles/UploadDropZoneStyle";

function UploadDropZone({ onImportFromLocal }) {
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
      onDrop={(e) => handleFileDrop(e, onImportFromLocal)}
      onDragOver={handleFileDragOver}
      onDragLeave={handleFileDragLeave}
    >
      <S.UploadImage />
      <h3>
        여기로 tar 압축파일을 드래그하거나
        <span onClick={handleFileInputClick}>클릭하여 업로드</span>
        하세요.
      </h3>
      <input
        type="file"
        accept=".tar"
        onChange={(e) => onImportFromLocal(e)}
        ref={fileInputRef}
        hidden
      />
    </S.UploadDropZoneLayout>
  );
}

export default UploadDropZone;
