import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
  const [featured, setFeatured] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  async function fetchProducts() {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao carregar produtos");
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

  const totalProducts = useMemo(() => products.length, [products]);

  const categoriesCount = useMemo(() => {
    const uniqueCategories = new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
        .map((category) => category.trim().toLowerCase())
    );

    return uniqueCategories.size;
  }, [products]);

  const productsWithoutImage = useMemo(() => {
    return products.filter((product) => !product.image).length;
  }, [products]);

  const featuredCount = useMemo(() => {
    return products.filter((product) => product.featured).length;
  }, [products]);

  function resetForm() {
    setName("");
    setPrice("");
    setImage("");
    setSelectedFile(null);
    setDescription("");
    setCategory("");
    setSizes("");
    setFeatured(false);
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
    setFeatured(Boolean(product.featured));
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        toast.error("Digite um preço válido. Exemplo: 34.90");
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
        toast.error("Envie uma imagem ou preencha a URL da imagem.");
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
        featured,
      };

      if (editingId) {
        await axios.put(`${API_URL}/products/${editingId}`, productData);
        toast.success("Produto atualizado com sucesso!");
      } else {
        await axios.post(`${API_URL}/products`, productData);
        toast.success("Produto cadastrado com sucesso!");
      }

      resetForm();
      await fetchProducts();
    } catch (error) {
      console.log(error);
      toast.error("Erro ao salvar produto");
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
      toast.success("Produto excluído com sucesso!");
      await fetchProducts();
    } catch (error) {
      console.log(error);
      toast.error("Erro ao excluir produto");
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
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "1rem",
      marginBottom: "2rem",
    },
    statCard: {
      background: "#ffffff",
      border: "1px solid #e5e7eb",
      borderRadius: "16px",
      padding: "1.25rem",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.04)",
    },
    statLabel: {
      margin: 0,
      fontSize: "0.9rem",
      color: "#6b7280",
    },
    statValue: {
      margin: "0.4rem 0 0",
      fontSize: "1.7rem",
      fontWeight: 700,
      color: "#111827",
    },
    statDescription: {
      margin: "0.35rem 0 0",
      color: "#6b7280",
      lineHeight: 1.5,
    },
    contentGrid: {
      display: "grid",
      gridTemplateColumns: "minmax(320px, 420px) 1fr",
      gap: "1.5rem",
      alignItems: "start",
    },
    panel: {
      background: "#ffffff",
      border: "1px solid #e5e7eb",
      borderRadius: "18px",
      padding: "1.5rem",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.04)",
    },
    sectionTitle: {
      marginTop: 0,
      marginBottom: "1rem",
      fontSize: "1.3rem",
      color: "#111827",
    },
    form: {
      display: "grid",
      gap: "0.95rem",
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
    textarea: {
      width: "100%",
      border: "1px solid #d1d5db",
      borderRadius: "12px",
      padding: "0.85rem 1rem",
      fontSize: "1rem",
      outline: "none",
      background: "#fff",
      resize: "vertical",
      minHeight: "120px",
      fontFamily: "inherit",
    },
    checkboxRow: {
      display: "flex",
      alignItems: "center",
      gap: "0.65rem",
      padding: "0.85rem 1rem",
      border: "1px solid #d1d5db",
      borderRadius: "12px",
      background: "#f9fafb",
      color: "#111827",
      fontWeight: 600,
    },
    buttonRow: {
      display: "flex",
      gap: "0.75rem",
      flexWrap: "wrap",
      marginTop: "0.25rem",
    },
    primaryButton: {
      border: "none",
      background: "#111827",
      color: "#fff",
      padding: "0.85rem 1.1rem",
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: 600,
    },
    secondaryButton: {
      border: "1px solid #d1d5db",
      background: "#fff",
      color: "#111827",
      padding: "0.85rem 1.1rem",
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: 600,
    },
    tableWrap: {
      overflowX: "auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: "860px",
    },
    th: {
      textAlign: "left",
      padding: "0.9rem",
      fontSize: "0.9rem",
      color: "#6b7280",
      borderBottom: "1px solid #e5e7eb",
      background: "#f9fafb",
      whiteSpace: "nowrap",
    },
    td: {
      padding: "0.95rem 0.9rem",
      borderBottom: "1px solid #e5e7eb",
      verticalAlign: "middle",
    },
    productCell: {
      display: "flex",
      alignItems: "center",
      gap: "0.9rem",
    },
    thumb: {
      width: "64px",
      height: "64px",
      objectFit: "cover",
      borderRadius: "12px",
      border: "1px solid #e5e7eb",
      flexShrink: 0,
      background: "#f3f4f6",
    },
    productName: {
      margin: 0,
      fontWeight: 700,
      color: "#111827",
    },
    muted: {
      margin: "0.25rem 0 0",
      color: "#6b7280",
      fontSize: "0.92rem",
    },
    featuredBadge: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "0.45rem",
      padding: "0.25rem 0.6rem",
      borderRadius: "999px",
      background: "#111827",
      color: "#fff",
      fontSize: "0.76rem",
      fontWeight: 700,
      letterSpacing: "0.02em",
    },
    actionGroup: {
      display: "flex",
      gap: "0.5rem",
      flexWrap: "wrap",
    },
    editButton: {
      border: "none",
      background: "#111827",
      color: "#fff",
      padding: "0.7rem 0.95rem",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: 600,
    },
    deleteButton: {
      border: "none",
      background: "#dc2626",
      color: "#fff",
      padding: "0.7rem 0.95rem",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: 600,
    },
    emptyState: {
      padding: "1.5rem",
      textAlign: "center",
      color: "#6b7280",
      border: "1px dashed #d1d5db",
      borderRadius: "16px",
      background: "#fafafa",
    },
  };

  if (loading) {
    return (
      <main className="container" style={styles.page}>
        <div style={styles.panel}>
          <p style={{ margin: 0 }}>Carregando produtos...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container" style={styles.page}>
      <section style={styles.hero}>
        <p style={styles.heroLabel}>Área administrativa</p>
        <h1 style={styles.heroTitle}>Painel de Produtos</h1>
        <p style={styles.heroText}>
          Aqui você cadastra, edita e remove produtos do ecommerce. Agora também
          é possível marcar peças em destaque para aparecerem na Home.
        </p>
      </section>

      <section style={styles.statsGrid}>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Total de produtos</p>
          <h3 style={styles.statValue}>{totalProducts}</h3>
          <p style={styles.statDescription}>
            Quantidade total de itens cadastrados no catálogo.
          </p>
        </div>

        <div style={styles.statCard}>
          <p style={styles.statLabel}>Categorias</p>
          <h3 style={styles.statValue}>{categoriesCount}</h3>
          <p style={styles.statDescription}>
            Número de categorias distintas encontradas nos produtos.
          </p>
        </div>

        <div style={styles.statCard}>
          <p style={styles.statLabel}>Em destaque</p>
          <h3 style={styles.statValue}>{featuredCount}</h3>
          <p style={styles.statDescription}>
            Produtos que vão aparecer como destaque na Home.
          </p>
        </div>

        <div style={styles.statCard}>
          <p style={styles.statLabel}>Sem imagem</p>
          <h3 style={styles.statValue}>{productsWithoutImage}</h3>
          <p style={styles.statDescription}>
            Produtos que precisam ter imagem ajustada.
          </p>
        </div>
      </section>

      <section style={styles.contentGrid}>
        <div style={styles.panel}>
          <h2 style={styles.sectionTitle}>
            {editingId ? "Editar produto" : "Cadastrar produto"}
          </h2>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              placeholder="Nome do produto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />

            <input
              type="text"
              placeholder="Preço"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={styles.input}
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files[0] || null)}
              style={styles.input}
            />

            <input
              type="text"
              placeholder="Ou cole a URL da imagem"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              style={styles.input}
            />

            <textarea
              placeholder="Descrição do produto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              style={styles.textarea}
            />

            <input
              type="text"
              placeholder="Categoria"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={styles.input}
            />

            <input
              type="text"
              placeholder="Tamanhos separados por vírgula. Ex: P, M, G, GG"
              value={sizes}
              onChange={(e) => setSizes(e.target.value)}
              style={styles.input}
            />

            <label style={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
              Produto em destaque
            </label>

            <div style={styles.buttonRow}>
              <button type="submit" disabled={saving} style={styles.primaryButton}>
                {saving
                  ? "Salvando..."
                  : editingId
                  ? "Atualizar produto"
                  : "Salvar produto"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  style={styles.secondaryButton}
                >
                  Cancelar edição
                </button>
              )}
            </div>
          </form>
        </div>

        <div style={styles.panel}>
          <h2 style={styles.sectionTitle}>Produtos cadastrados</h2>

          {products.length === 0 ? (
            <div style={styles.emptyState}>
              Nenhum produto cadastrado ainda.
            </div>
          ) : (
            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Produto</th>
                    <th style={styles.th}>Preço</th>
                    <th style={styles.th}>Categoria</th>
                    <th style={styles.th}>Tamanhos</th>
                    <th style={styles.th}>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => {
                    const imageSrc = product.image?.startsWith("http")
                      ? product.image
                      : `${API_URL}${product.image}`;

                    return (
                      <tr key={product._id}>
                        <td style={styles.td}>
                          <div style={styles.productCell}>
                            <img
                              src={imageSrc}
                              alt={product.name}
                              style={styles.thumb}
                            />

                            <div>
                              <p style={styles.productName}>{product.name}</p>
                              <p style={styles.muted}>
                                {product.description?.slice(0, 70) ||
                                  "Sem descrição"}
                                {product.description?.length > 70 ? "..." : ""}
                              </p>

                              {product.featured && (
                                <span style={styles.featuredBadge}>
                                  EM DESTAQUE
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        <td style={styles.td}>
                          R$ {Number(product.price).toFixed(2)}
                        </td>

                        <td style={styles.td}>
                          {product.category || "-"}
                        </td>

                        <td style={styles.td}>
                          {Array.isArray(product.sizes) && product.sizes.length > 0
                            ? product.sizes.join(", ")
                            : "-"}
                        </td>

                        <td style={styles.td}>
                          <div style={styles.actionGroup}>
                            <button
                              type="button"
                              onClick={() => handleEdit(product)}
                              style={styles.editButton}
                            >
                              Editar
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(product._id)}
                              style={styles.deleteButton}
                            >
                              Excluir
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default AdminProductsPage;