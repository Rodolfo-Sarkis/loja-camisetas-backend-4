import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [sizes, setSizes] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  async function fetchProducts() {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
      alert("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function loadProducts() {
      await fetchProducts();
    }

    loadProducts();
  }, []);

  function resetForm() {
    setName("");
    setPrice("");
    setImage("");
    setSelectedFile(null);
    setDescription("");
    setCategory("");
    setSizes("");
    setEditingId(null);
  }

  function handleEdit(product) {
    setEditingId(product._id);
    setName(product.name || "");
    setPrice(product.price?.toString() || "");
    setImage(product.image || "");
    setSelectedFile(null);
    setDescription(product.description || "");
    setCategory(product.category || "");
    setSizes(Array.isArray(product.sizes) ? product.sizes.join(", ") : "");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSaving(true);

      const normalizedPrice = Number(price.replace(",", "."));
      const normalizedSizes = sizes
        .split(",")
        .map((size) => size.trim())
        .filter(Boolean);

      if (Number.isNaN(normalizedPrice)) {
        alert("Digite um preço válido. Exemplo: 34.90");
        return;
      }

      let finalImage = image.trim();

      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);

        const uploadResponse = await axios.post(`${API_URL}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        finalImage = uploadResponse.data.imageUrl;
      }

      if (!finalImage) {
        alert("Envie uma imagem ou preencha a URL da imagem.");
        return;
      }

      if (!finalImage.startsWith("http")) {
        finalImage = `${API_URL}${finalImage}`;
      }

      const productData = {
        name,
        price: normalizedPrice,
        image: finalImage,
        description,
        category,
        sizes: normalizedSizes,
      };

      if (editingId) {
        await axios.put(`${API_URL}/products/${editingId}`, productData);
        alert("Produto atualizado com sucesso!");
      } else {
        await axios.post(`${API_URL}/products`, productData);
        alert("Produto cadastrado com sucesso!");
      }

      resetForm();
      await fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Erro ao salvar produto");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este produto?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/products/${id}`);
      alert("Produto excluído com sucesso!");
      await fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Erro ao excluir produto");
    }
  }

  if (loading) {
    return (
      <>
        
        <main className="container">
          <p>Carregando produtos...</p>
        </main>
      </>
    );
  }

  return (
    <>
      

      <main className="container" style={{ paddingTop: "2rem" }}>
        <h1>Painel de Produtos</h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gap: "1rem",
            maxWidth: "600px",
            marginTop: "2rem",
            marginBottom: "3rem",
          }}
        >
          <h2>{editingId ? "Editar produto" : "Cadastrar produto"}</h2>

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
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0] || null)}
          />

          <input
            type="text"
            placeholder="Ou cole a URL da imagem"
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

          <input
            type="text"
            placeholder="Tamanhos separados por vírgula. Ex: P, M, G, GG"
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
          />

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button type="submit" disabled={saving}>
              {saving
                ? "Salvando..."
                : editingId
                ? "Atualizar produto"
                : "Salvar produto"}
            </button>

            {editingId && (
              <button type="button" onClick={resetForm}>
                Cancelar edição
              </button>
            )}
          </div>
        </form>

        <div style={{ display: "grid", gap: "1rem" }}>
          {products.map((product) => {
            const imageSrc = product.image?.startsWith("http")
              ? product.image
              : `${API_URL}${product.image}`;

            return (
              <div
                key={product._id}
                style={{
                  border: "1px solid #ccc",
                  padding: "1rem",
                  borderRadius: "10px",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <img
                  src={imageSrc}
                  alt={product.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />

                <div style={{ flex: 1, minWidth: "200px" }}>
                  <h3>{product.name}</h3>
                  <p>R$ {Number(product.price).toFixed(2)}</p>
                  <p>{product.category}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleEdit(product)}
                  style={{
                    background: "#222",
                    color: "white",
                    border: "none",
                    padding: "0.7rem 1rem",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Editar
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(product._id)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "0.7rem 1rem",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Excluir
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default AdminProductsPage;