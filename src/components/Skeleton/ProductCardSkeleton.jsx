function ProductCardSkeleton() {
  return (
    <div className="product-skeleton">
      <div className="product-skeleton__image"></div>

      <div className="product-skeleton__content">
        <div className="product-skeleton__title"></div>

        <div className="product-skeleton__price"></div>
      </div>
    </div>
  );
}

export default ProductCardSkeleton;