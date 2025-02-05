import { useState, useRef } from "react";

import * as S from "../styles/UploadDropZoneStyle";

function UploadDropZone({ onImportFromLocal }) {
  2;
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = [...e.dataTransfer.files];
    droppedFiles.forEach((file) => {
      const mockEvent = { target: { files: [file] } };

      onImportFromLocal(mockEvent);
    });
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <S.UploadDropZoneLayout
      $isDragging={isDragging}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <S.UploadImage />
      <h3>
        여기로 파일을 드래그하거나 <span onClick={handleClick}>클릭하여 업로드</span>하세요.
      </h3>
      <input
        type="file"
        accept=".md"
        onChange={(e) => onImportFromLocal(e)}
        ref={fileInputRef}
        hidden
      />
    </S.UploadDropZoneLayout>
  );
}

export default UploadDropZone;
