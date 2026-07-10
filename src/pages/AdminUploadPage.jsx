import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../config/api";

function AdminUploadPage() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {
    e.preventDefault();

    if (!file) {
      toast.error("Selecione uma imagem primeiro.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        `${API_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const finalUrl = response.data.imageUrl.startsWith("http")
        ? response.data.imageUrl
        : `${API_URL}${response.data.imageUrl}`;

      setImageUrl(finalUrl);
      toast.success("Imagem enviada com sucesso!");
      setFile(null);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao enviar imagem");
    } finally {
      setLoading(false);
    }
  }

  const styles = {
    page: {
      paddingTop: "2rem",
      paddingBottom: "3rem",
    },
    hero: {
      background: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
      color: "#fff",
      borderRadius: "20px",
      padding: "2rem",
      boxShadow: "0 12px 30px rgba(0, 0, 0, 0.12)",
      marginBottom: "1.5rem",
    },
    heroLabel: {
      margin: 0,
      opacity: 0.8,
      fontSize: "0.95rem",
    },
    heroTitle: {
      margin: "0.5rem 0 0.75rem",
      fontSize: "2rem",
    },
    heroText: {
      margin: 0,
      maxWidth: "720px",
      lineHeight: 1.6,
      opacity: 0.9,
    },
    panel: {
      background: "#ffffff",
      border: "1px solid #e5e7eb",
      borderRadius: "18px",
      padding: "1.5rem",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.04)",
      maxWidth: "620px",
    },
    sectionTitle: {
      marginTop: 0,
      marginBottom: "1rem",
      fontSize: "1.3rem",
      color: "#111827",
    },
    form: {
      display: "grid",
      gap: "1rem",
    },
    input: {
      width: "100%",
      border: "1px solid #d1d5db",
      borderRadius: "12px",
      padding: "0.85rem 1rem",
      fontSize: "1rem",
      outline: "none",
      background: "#fff",
    },
    button: {
      border: "none",
      background: "#111827",
      color: "#fff",
      padding: "0.9rem 1.1rem",
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: 600,
    },
    previewBox: {
      marginTop: "2rem",
      padding: "1.25rem",
      borderRadius: "16px",
      border: "1px solid #e5e7eb",
      background: "#f9fafb",
    },
    previewTitle: {
      marginTop: 0,
      marginBottom: "0.75rem",
      fontSize: "1.1rem",
    },
    previewLink: {
      display: "inline-block",
      marginBottom: "1rem",
      color: "#111827",
      wordBreak: "break-all",
    },
    previewImage: {
      width: "100%",
      maxWidth: "320px",
      borderRadius: "16px",
      border: "1px solid #e5e7eb",
      display: "block",
    },
  };

  return (
    <main className="container" style={styles.page}>
      <section style={styles.hero}>
        <p style={styles.heroLabel}>Área administrativa</p>
        <h1 style={styles.heroTitle}>Upload de imagens</h1>
        <p style={styles.heroText}>
          Envie imagens para usar nos produtos do ecommerce. Essa tela agora está
          com um visual mais limpo e profissional para o painel.
        </p>
      </section>

      <section style={styles.panel}>
        <h2 style={styles.sectionTitle}>Selecionar imagem</h2>

        <form onSubmit={handleUpload} style={styles.form}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0] || null)}
            style={styles.input}
          />

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Enviando..." : "Enviar imagem"}
          </button>
        </form>

        {imageUrl && (
          <div style={styles.previewBox}>
            <h3 style={styles.previewTitle}>Imagem enviada com sucesso</h3>

            <a
              href={imageUrl}
              target="_blank"
              rel="noreferrer"
              style={styles.previewLink}
            >
              {imageUrl}
            </a>

            <img
              src={imageUrl}
              alt="Preview da imagem enviada"
              style={styles.previewImage}
            />
          </div>
        )}
      </section>
    </main>
  );
}

export default AdminUploadPage;