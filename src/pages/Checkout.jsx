import { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [complement, setComplement] = useState("");

  const total = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return acc + price * quantity;
    }, 0);
  }, [cartItems]);

  function handleSubmit(e) {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Seu carrinho está vazio.");
      return;
    }

    if (!name || !email || !phone || !address) {
      toast.error("Preencha os campos obrigatórios.");
      return;
    }

    toast.success("Pedido preparado com sucesso!");

    clearCart();
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setComplement("");
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
    heroTitle: {
      margin: 0,
      fontSize: "2rem",
    },
    heroText: {
      margin: "0.75rem 0 0",
      maxWidth: "700px",
      lineHeight: 1.6,
      color: "rgba(255, 255, 255, 0.88)",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1.1fr 0.9fr",
      gap: "1.5rem",
      alignItems: "start",
    },
    panel: {
      background: "#fff",
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
      padding: "0.9rem 1rem",
      fontSize: "1rem",
      outline: "none",
      background: "#fff",
    },
    textarea: {
      width: "100%",
      border: "1px solid #d1d5db",
      borderRadius: "12px",
      padding: "0.9rem 1rem",
      fontSize: "1rem",
      outline: "none",
      background: "#fff",
      resize: "vertical",
      minHeight: "110px",
      fontFamily: "inherit",
    },
    button: {
      border: "none",
      background: "linear-gradient(135deg, #111827, #374151)",
      color: "#fff",
      padding: "0.95rem 1.2rem",
      borderRadius: "14px",
      cursor: "pointer",
      fontWeight: 700,
      transition: "transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease",
      boxShadow: "0 10px 22px rgba(17, 24, 39, 0.18)",
    },
    summaryList: {
      display: "grid",
      gap: "1rem",
    },
    item: {
      display: "flex",
      gap: "0.9rem",
      padding: "0.9rem",
      borderRadius: "14px",
      border: "1px solid #e5e7eb",
      background: "#f9fafb",
      alignItems: "center",
    },
    image: {
      width: "72px",
      height: "72px",
      objectFit: "cover",
      borderRadius: "12px",
      border: "1px solid #e5e7eb",
      flexShrink: 0,
      background: "#fff",
    },
    itemName: {
      margin: 0,
      fontWeight: 700,
      color: "#111827",
    },
    itemText: {
      margin: "0.25rem 0 0",
      color: "#6b7280",
      fontSize: "0.95rem",
    },
    totalBox: {
      marginTop: "1.25rem",
      paddingTop: "1rem",
      borderTop: "1px solid #e5e7eb",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "1rem",
    },
    totalLabel: {
      margin: 0,
      color: "#6b7280",
    },
    totalValue: {
      margin: 0,
      fontSize: "1.35rem",
      fontWeight: 800,
      color: "#111827",
    },
    emptyBox: {
      padding: "1.25rem",
      borderRadius: "14px",
      background: "#f9fafb",
      color: "#6b7280",
      border: "1px solid #e5e7eb",
    },
    backLink: {
      display: "inline-flex",
      marginTop: "1rem",
      color: "#111827",
      fontWeight: 700,
      textDecoration: "none",
    },
    smallNote: {
      marginTop: "1rem",
      fontSize: "0.92rem",
      color: "#6b7280",
      lineHeight: 1.6,
    },
  };

  if (cartItems.length === 0) {
    return (
      <main className="container" style={styles.page}>
        <section style={styles.hero}>
          <h1 style={styles.heroTitle}>Checkout</h1>
          <p style={styles.heroText}>
            Seu carrinho está vazio no momento. Escolha alguns produtos para
            continuar com a finalização da compra.
          </p>
        </section>

        <div style={styles.panel}>
          <div style={styles.emptyBox}>
            Nenhum item disponível para checkout.
          </div>

          <Link to="/products" style={styles.backLink}>
            Voltar para os produtos →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container" style={styles.page}>
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Checkout</h1>
        <p style={styles.heroText}>
          Preencha seus dados para continuar com a finalização do pedido.
          Revise os itens no resumo ao lado antes de concluir.
        </p>
      </section>

      <div style={styles.grid}>
        <section style={styles.panel}>
          <h2 style={styles.sectionTitle}>Dados de entrega</h2>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              placeholder="Nome completo *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />

            <input
              type="email"
              placeholder="E-mail *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />

            <input
              type="tel"
              placeholder="Telefone / WhatsApp *"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={styles.input}
            />

            <textarea
              placeholder="Endereço completo *"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={styles.textarea}
            />

            <textarea
              placeholder="Complemento, referência ou observações"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
              style={styles.textarea}
            />

            <button type="submit" style={styles.button}>
              Finalizar pedido
            </button>
          </form>

          <p style={styles.smallNote}>
            O pagamento pode ser integrado depois com Mercado Pago. Por enquanto,
            esta etapa serve como estrutura profissional do checkout.
          </p>
        </section>

        <aside style={styles.panel}>
          <h2 style={styles.sectionTitle}>Resumo do pedido</h2>

          <div style={styles.summaryList}>
            {cartItems.map((item) => {
              const imageSrc = item.image?.startsWith("http")
                ? item.image
                : item.image;

              return (
                <div key={`${item.id}-${item.size}`} style={styles.item}>
                  <img
                    src={imageSrc}
                    alt={item.name}
                    style={styles.image}
                  />

                  <div>
                    <p style={styles.itemName}>{item.name}</p>
                    <p style={styles.itemText}>
                      Tamanho: {item.size} • Qtd: {Number(item.quantity) || 0}
                    </p>
                    <p style={styles.itemText}>
                      Subtotal: R${" "}
                      {(
                        (Number(item.price) || 0) *
                        (Number(item.quantity) || 0)
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={styles.totalBox}>
            <p style={styles.totalLabel}>Total</p>
            <p style={styles.totalValue}>R$ {total.toFixed(2)}</p>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;