export default function DownloadExcelButton() {

  const handleDownload = () => {
    window.open("http://localhost:3000/excel", "_blank");
  };

  return (
    <button onClick={handleDownload}>
      Download Excel
    </button>
  );
}
