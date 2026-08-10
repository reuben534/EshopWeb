import { useWishlist } from '../context/WishlistContext.jsx';
import { formatZAR } from '../utils/currency.js';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
  const { wishlist, removeItem } = useWishlist();

  if (!wishlist.items.length) {
    return (
      <section className="section">
        <h3>Your wishlist is empty</h3>
        <p>Save products to purchase later.</p>
      </section>
    );
  }

  return (
    <section className="section">
      <h3>Wishlist</h3>
      <div className="card-grid">
        {wishlist.items.map((product) => (
          <article className="product-card" key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <strong>{formatZAR(product.price)}</strong>
            </Link>
            <button type="button" className="btn secondary-btn remove-btn" onClick={() => removeItem(product)}>🗑 Remove</button>
          </article>
        ))}
      </div>
    </section>
  );
}
