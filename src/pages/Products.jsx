import Header from "../components/header/Header";
import ProductCard from "../components/ProductCard/ProductCard";
import products from "../data/products";

function Products() {
  return (
    <>
      <Header />

      <main className="container">
        <h1 className="title">Produtos</h1>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
}

export default Products;