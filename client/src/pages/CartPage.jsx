import { useCart } from '../context/CartContext.jsx';
import { formatZAR } from '../utils/currency.js';

export default function CartPage() {
  const { cart, updateItem, removeItem } = useCart();

  if (cart.items.length === 0) {
    return (
      <section className="section">
        <h3>Your cart is empty</h3>
        <p>Add a product to begin checkout.</p>
      </section>
    );
  }

  return (
    <section className="section">
      <h3>Shopping Cart</h3>
      <div className="cart-grid">
        {cart.items.map((item) => (
          <div className="cart-item" key={item.productId}>
            <h4>{item.name}</h4>
            <p>{formatZAR(item.price)}</p>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(event) => updateItem(item.productId, Number(event.target.value))}
            />
            <button type="button" className="btn secondary-btn remove-btn" onClick={() => removeItem(item.productId)}>🗑 Remove</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p>Subtotal: {formatZAR(cart.subtotal)}</p>
        <p>VAT: {formatZAR(cart.tax)}</p>
        <p><strong>Total: {formatZAR(cart.total)}</strong></p>
      </div>
    </section>
  );
}
