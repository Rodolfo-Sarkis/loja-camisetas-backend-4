import { useState } from "react";
import axios from "axios";

import Header from "../components/header/Header";

function AdminUploadPage() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {
    e.preventDefault();

    if (!file) {
      alert("Selecione uma imagem primeiro.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setImageUrl(`http://localhost:5000${response.data.imageUrl}`);
      alert("Imagem enviada com sucesso!");
      setFile(null);
    } catch (error) {
      console.log(error);
      alert("Erro ao enviar imagem");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />

      <main className="container" style={{ paddingTop: "2rem" }}>
        <h1>Upload de imagens</h1>
        <p>Envie uma imagem para usar nos produtos.</p>

        <form
          onSubmit={handleUpload}
          style={{
            display: "grid",
            gap: "1rem",
            maxWidth: "500px",
            marginTop: "2rem",
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar imagem"}
          </button>
        </form>

        {imageUrl && (
          <div style={{ marginTop: "2rem" }}>
            <p>Imagem enviada com sucesso:</p>
            <a href={imageUrl} target="_blank" rel="noreferrer">
              {imageUrl}
            </a>
          </div>
        )}
      </main>
    </>
  );
}

export default AdminUploadPage;