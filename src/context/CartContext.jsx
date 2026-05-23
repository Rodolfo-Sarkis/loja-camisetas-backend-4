import {
  createContext,
  useState,
  useEffect
} from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState(() => {

    const storedCart =
      localStorage.getItem("cartItems");

    return storedCart
      ? JSON.parse(storedCart)
      : [];
  });

  useEffect(() => {

    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );

  }, [cartItems]);

  function addToCart(
    product,
    size,
    quantity
  ) {

    const resolvedSize =
      size ?? product?.sizes?.[0];

    const parsedQuantity =
      Number(quantity) || 1;

    const existingProduct =
      cartItems.find(

        (item) =>

            item.id === product.id &&
            item.size === resolvedSize
      );

    if (existingProduct) {

      const updatedCart =
        cartItems.map((item) => {

          if (
            item.id === product.id &&
            item.size === resolvedSize
          ) {

            return {

              ...item,

              quantity:
                Number(item.quantity) +
                parsedQuantity
            };
          }

          return item;
        });

      setCartItems(updatedCart);

    } else {

      setCartItems([

        ...cartItems,

        {
          ...product,

          size: resolvedSize,

          quantity: parsedQuantity
        }
      ]);
    }
  }

  function removeFromCart(id, size) {

    const updatedCart =
      cartItems.filter(

        (item) =>

          !(
            item.id === id &&
            item.size === size
          )
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

        clearCart
      }}
    >

      {children}

    </CartContext.Provider>
  );
}