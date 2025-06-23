import React, { isValidElement, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && isValidFileType(file)) {
      setSelectedFile(file);
      setErrorMsg("");
    } else {
      setSelectedFile(null);
      setErrorMsg("Hanya file .pdf atau .docx yang diperbolehkan.");
    }
  };

  const isValidFileType = (file) => {
    return (
      file.type === "application/pdf" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setErrorMsg("Silahkan pilih file terlebih dahulu.");
      return;
    }

    alert(`File "${selectedFile.name} berhasil diupload!`);
  };

  return (
    <div className="min-h-screen bg-background text-primary">
      <Header />

      <main className="flex flex-col items-center justify-center py-20 px-4">
        <h2 className="text-3xl font-bold mb-6">Upload CV Anda</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-lg"
        >
          <label className="block mb-4 text-lg font-medium">
            Pilih CV (.pdf / .docx)
          </label>

          <div className="relative border-2 border-dashed border-gray-600 rounded-xl p-6 text-center mb-4 cursor-pointer hover:border-accent transition">
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <p className="text-secondary">
              Seret dan lepas file ke sini, atau klik untuk memilih
            </p>
          </div>

          {selectedFile && (
            <p className="text-sm text-green-400 mb-4">
              File dipilih:{" "}
              <span className="font-semibold">{selectedFile.name}</span>
            </p>
          )}

          {errorMsg && <p className="text-sm text-red-400 mb-4">{errorMsg}</p>}

          <button
            type="submit"
            className="w-full bg-accent text-black py-2 rounded-lg font-semibold hover:bg-sky-500"
          >
            Upload Sekarang
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Upload;
