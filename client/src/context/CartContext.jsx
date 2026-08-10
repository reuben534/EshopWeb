import { createContext, useContext, useEffect, useReducer } from 'react';
import { addToCart as apiAddToCart, getCart as apiGetCart, removeFromCart as apiRemoveFromCart, updateCart as apiUpdateCart } from '../api/api.js';

const CartContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'initialize':
      return action.payload;
    case 'set':
      return action.payload;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [], subtotal: 0, tax: 0, total: 0 });

  useEffect(() => {
    apiGetCart().then((cart) => dispatch({ type: 'set', payload: cart })).catch(() => {});
  }, []);

  const addItem = async (item) => {
    const response = await apiAddToCart(item);
    if (response?.cart) {
      dispatch({ type: 'set', payload: response.cart });
    }
  };

  const updateItem = async (productId, quantity) => {
    const response = await apiUpdateCart({ productId, quantity });
    if (response?.cart) {
      dispatch({ type: 'set', payload: response.cart });
    }
  };

  const removeItem = async (productId) => {
    const response = await apiRemoveFromCart({ productId });
    if (response?.cart) {
      dispatch({ type: 'set', payload: response.cart });
    }
  };

  return (
    <CartContext.Provider value={{ cart: state, addItem, updateItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
