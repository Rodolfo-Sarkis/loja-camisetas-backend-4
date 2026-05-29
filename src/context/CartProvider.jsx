import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { CartContext } from "./CartContext";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");

    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product, size, quantity) {
    const resolvedSize = size ?? product?.sizes?.[0];
    const parsedQuantity = Number(quantity) || 1;

    let toastMessage = "Produto adicionado ao carrinho";

    setCartItems((currentCart) => {
      const existingProduct = currentCart.find(
        (item) =>
          item.id === product.id &&
          item.size === resolvedSize
      );

      if (existingProduct) {
        toastMessage = "Quantidade atualizada no carrinho";

        return currentCart.map((item) => {
          if (
            item.id === product.id &&
            item.size === resolvedSize
          ) {
            return {
              ...item,
              quantity:
                Number(item.quantity) + parsedQuantity,
            };
          }

          return item;
        });
      }

      return [
        ...currentCart,
        {
          ...product,
          size: resolvedSize,
          quantity: parsedQuantity,
        },
      ];
    });

    toast.success(toastMessage);
  }

  function removeFromCart(id, size) {
    const updatedCart = cartItems.filter(
      (item) =>
        !(item.id === id && item.size === size)
    );

    setCartItems(updatedCart);
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}