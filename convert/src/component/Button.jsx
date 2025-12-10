import { useRef, useState } from "react";

export default function UploadPDFButton() {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select at least one PDF file!");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("pdfs", file));

    try {
      const response = await fetch(
        "https://convert-pdf-to-excel-1z5e.onrender.com/convert",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Conversion failed");

      // ⭐ Read Excel file as blob
      const blob = await response.blob();

      // ⭐ Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      // Dynamic filename
      a.download = `converted_${Date.now()}.xlsx`;

      document.body.appendChild(a);
      a.click();
      a.remove();

      alert("Excel downloaded successfully!");

    } catch (err) {
      console.error(err);
      alert("Error converting PDFs!");
    }
  };

  return (
    <>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        multiple
        accept="application/pdf"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* File select button */}
      <button onClick={handleClick}>Select PDF Files</button>

      {/* Upload button */}
      <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
        Convert to Excel
      </button>

      {/* List selected files */}
      {selectedFiles.length > 0 && (
        <div>
          <p>Selected Files:</p>
          <ul>
            {selectedFiles.map((f, i) => (
              <li key={i}>{f.name}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
