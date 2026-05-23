import { useState } from "react";
import axios from "axios";
import Header from "../components/header/Header";

function AdminProductsPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const normalizedPrice = Number(price.replace(",", "."));

      if (Number.isNaN(normalizedPrice)) {
        alert("Digite um preço válido. Exemplo: 34.90");
        return;
      }

      await axios.post("http://localhost:5000/products", {
        name,
        price: normalizedPrice,
        image,
        description,
        category,
      });

      alert("Produto cadastrado com sucesso!");

      setName("");
      setPrice("");
      setImage("");
      setDescription("");
      setCategory("");
    } catch (error) {
      console.log(error);
      alert("Erro ao cadastrar produto");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />

      <main className="container" style={{ paddingTop: "2rem" }}>
        <h1>Cadastrar produtos</h1>
        <p>Área visual para montar o cadastro de produtos.</p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gap: "1rem",
            maxWidth: "500px",
            marginTop: "2rem",
          }}
        >
          <input
            type="text"
            placeholder="Nome do produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="text"
            placeholder="URL da imagem"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <textarea
            placeholder="Descrição do produto"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          />

          <input
            type="text"
            placeholder="Categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar produto"}
          </button>
        </form>
      </main>
    </>
  );
}

export default AdminProductsPage;