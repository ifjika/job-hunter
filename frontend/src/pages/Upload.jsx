import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [parsedData, setParsedData] = useState(null); // hasil dari backend
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && isValidFileType(file)) {
      setSelectedFile(file);
      setErrorMsg("");
      setParsedData(null); // reset hasil jika upload ulang
    } else {
      setSelectedFile(null);
      setParsedData(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setErrorMsg("Silahkan pilih file terlebih dahulu.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("http://localhost:8000/upload-cv/", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result?.data) {
        setParsedData(result.data);
      } else {
        setErrorMsg("Gagal parsing CV.");
      }
    } catch (error) {
      setErrorMsg("Terjadi kesalahan saat mengirim file.");
    } finally {
      setLoading(false);
    }
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
            disabled={loading}
          >
            {loading ? "Memproses..." : "Upload Sekarang"}
          </button>
        </form>

        {/* Hasil Parsing */}
        {parsedData && (
          <div className="mt-10 w-full max-w-lg bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-white">
              Hasil Parsing CV
            </h3>
            <ul className="space-y-2 text-secondary">
              <li>
                <strong>Nama:</strong> {parsedData.name || "Tidak ditemukan"}
              </li>
              <li>
                <strong>Email:</strong> {parsedData.email || "Tidak ditemukan"}
              </li>
              <li>
                <strong>No. Telepon:</strong>{" "}
                {parsedData.phone || "Tidak ditemukan"}
              </li>
              <li>
                <strong>Pendidikan:</strong> {parsedData.education || "-"}
              </li>
              <li>
                <strong>Pengalaman:</strong> {parsedData.experience || "-"}
              </li>
            </ul>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Upload;
