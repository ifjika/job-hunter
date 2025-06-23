import "../index.css";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-background text-primary min-h-screen">
      <Header />

      <main className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Ubah CV jadi Data Siap Olah</h2>
        <p className="text-secondary mb-6 max-w-xl mx-auto">
          Upload CV kamu dan lihat bagaimana sistem kami mengekstrak informasi
          penting secara otomatis.
        </p>
        <Link
          to="/upload"
          className="inline-block bg-accent text-black px-6 py-3 rounded-lg hover:bg-sky-500 font-semibold"
        >
          Upload CV Sekarang
        </Link>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
