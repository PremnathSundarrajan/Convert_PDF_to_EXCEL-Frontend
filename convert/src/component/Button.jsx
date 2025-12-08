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
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      alert("Upload Successful!");
    } catch (err) {
      alert("Error uploading PDFs!");
      console.error(err);
    }
  };

  return (
    <>
      {/* Hidden input field */}
      <input
        type="file"
        ref={fileInputRef}
        multiple
        accept="application/pdf"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* File select button */}
      <button onClick={handleClick}>
        Select PDF Files
      </button>

      {/* Upload button */}
      <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
        Upload
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
