import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const updateCartItem = (product, quantity) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                totalPrice: item.unitPrice * (item.quantity + quantity),
              }
            : item,
        );
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            title: product.title,
            image: product.image,
            quantity: quantity,
            unitPrice: product.price,
            totalPrice: product.price * quantity,
          },
        ];
      }
    });
  };

  const incrementCartItem = (product) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: item.unitPrice * (item.quantity + 1),
            }
          : item,
      ),
    );
  };

  const decrementCartItem = (product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem.quantity <= 1) {
        return prevCart.filter((item) => item.id !== product.id);
      } else {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity - 1,
                totalPrice: item.unitPrice * (item.quantity - 1),
              }
            : item,
        );
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        updateCartItem,
        incrementCartItem,
        decrementCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;

export const useCart = () => useContext(CartContext);
