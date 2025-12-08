export default function DownloadExcelButton() {

  const handleDownload = () => {
    window.open("https://convert-pdf-to-excel-1z5e.onrender.com/excel", "_blank");
  };

  return (
    <button onClick={handleDownload}>
      Download Excel
    </button>
  );
}
