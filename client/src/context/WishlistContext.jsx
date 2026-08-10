import { createContext, useContext, useEffect, useReducer } from 'react';

const WishlistContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'initialize':
      return action.payload;
    case 'add':
      if (state.items.some((item) => item.id === action.payload.id)) {
        return state;
      }
      return { ...state, items: [...state.items, action.payload] };
    case 'remove':
      return { ...state, items: state.items.filter((item) => item.id !== action.payload.id) };
    default:
      return state;
  }
}

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  useEffect(() => {
    const stored = window.localStorage.getItem('eshop-wishlist');
    if (stored) {
      dispatch({ type: 'initialize', payload: JSON.parse(stored) });
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('eshop-wishlist', JSON.stringify(state));
  }, [state]);

  const addItem = (product) => dispatch({ type: 'add', payload: product });
  const removeItem = (product) => dispatch({ type: 'remove', payload: product });

  return (
    <WishlistContext.Provider value={{ wishlist: state, addItem, removeItem }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
}
