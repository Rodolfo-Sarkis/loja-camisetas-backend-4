import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { CartContext } from "./CartContext";
import { API_URL } from "../config/api";

function getImageUrl(image) {
  if (!image) return "";

  if (image.startsWith("http")) {
    try {
      const url = new URL(image);

      if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
        return image.replace(`${url.protocol}//${url.host}`, API_URL);
      }

      return image;
    } catch {
      return image;
    }
  }

  return `${API_URL}${image.startsWith("/") ? "" : "/"}${image}`;
}

function normalizeCartItem(item) {
  return {
    ...item,
    image: getImageUrl(item.image),
  };
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");

    if (!storedCart) return [];

    try {
      const parsedCart = JSON.parse(storedCart);

      return Array.isArray(parsedCart)
        ? parsedCart.map(normalizeCartItem)
        : [];
    } catch (error) {
      console.log("Erro ao ler carrinho salvo:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product, size, quantity) {
    const resolvedSize = size ?? product?.sizes?.[0];
    const parsedQuantity = Number(quantity) || 1;

    const normalizedProduct = normalizeCartItem(product);

    let toastMessage = "Produto adicionado ao carrinho";

    setCartItems((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === normalizedProduct.id && item.size === resolvedSize
      );

      if (existingProduct) {
        toastMessage = "Quantidade atualizada no carrinho";

        return currentCart.map((item) => {
          if (item.id === normalizedProduct.id && item.size === resolvedSize) {
            return {
              ...item,
              quantity: Number(item.quantity) + parsedQuantity,
              image: getImageUrl(item.image),
            };
          }

          return item;
        });
      }

      return [
        ...currentCart,
        {
          ...normalizedProduct,
          size: resolvedSize,
          quantity: parsedQuantity,
        },
      ];
    });

    toast.success(toastMessage);
  }

  function removeFromCart(id, size) {
    const updatedCart = cartItems.filter(
      (item) => !(item.id === id && item.size === size)
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