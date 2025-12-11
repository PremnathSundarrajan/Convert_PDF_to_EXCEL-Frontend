import { useRef, useState } from "react";

export default function UploadPDFButton() {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);

      const response = await fetch(
        "https://convert-pdf-to-excel-1z5e.onrender.com/convert",
        {
          method: "POST",
          body: formData,
        }
      );

      // 🔥 Check if backend returned JSON (error)
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        console.error("Backend Error:", errorData);
        alert(errorData.error || "Conversion failed!");
        setLoading(false);
        return;
      }

      // 🔥 Otherwise it's Excel → Download it
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `converted_${Date.now()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();

    } catch (err) {
      console.error(err);
      alert("Error converting PDFs!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        multiple
        accept="application/pdf"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Select Files Button */}
      <button
        onClick={handleClick}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        {loading ? "Processing…" : "Select PDF Files"}
      </button>

      {/* Convert Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        {loading ? "Converting…" : "Convert to Excel"}
      </button>

      {/* File List */}
      {selectedFiles.length > 0 && !loading && (
        <div style={{ marginTop: "20px" }}>
          <p>Selected Files:</p>
          <ul>
            {selectedFiles.map((f, i) => (
              <li key={i}>{f.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <div className="spinner"></div>
          <p style={{ fontSize: "18px", marginTop: "10px" }}>
            Converting PDFs… Please wait
          </p>

          <style>{`
            .spinner {
              margin: 0 auto;
              border: 6px solid #ccc;
              border-top: 6px solid #3498db;
              border-radius: 50%;
              width: 45px;
              height: 45px;
              animation: spin 0.8s linear infinite;
            }

            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
