const downloadTarFile = async (response) => {
  const contentDisposition = response.headers["content-disposition"];
  const filename = contentDisposition
    ? decodeURIComponent(
        contentDisposition.match(/filename\*=(?:UTF-8'')?(.+)/)?.[1] ||
          contentDisposition.match(/filename="(.+?)"/)?.[1]
      )
    : "노트.tar";

  const fileUrl = URL.createObjectURL(response.data);
  const link = document.createElement("a");
  link.href = fileUrl;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(fileUrl);
};

export default downloadTarFile;
