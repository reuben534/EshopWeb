import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api/api.js';
import { formatZAR } from '../utils/currency.js';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { addItem: addWishlistItem } = useWishlist();

  useEffect(() => {
    getProductById(id).then(setProduct);
  }, [id]);

  if (!product) return <section className="section">Loading product...</section>;

  return (
    <section className="section product-detail">
      <div className="product-detail-card">
        <img src={product.image} alt={product.name} />
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p><strong>SKU:</strong> {product.sku}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> {formatZAR(product.price)}</p>
          <div className="product-actions">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
            />
            <button type="button" className="btn primary-btn cart-btn" onClick={() => addItem({
              productId: product.id,
              name: product.name,
              price: product.price,
              quantity,
              category: product.category
            })}>
              <span>🛒</span> Add to Cart
            </button>
            <button type="button" className="btn secondary-btn wishlist-btn" onClick={() => addWishlistItem(product)}>
              <span>🤍</span> Wishlist
            </button>
          </div>
        </div>
      </div>
      <div className="product-specs">
        <h3>Specifications</h3>
        <ul>
          {product.specifications.map((spec) => (
            <li key={spec}>{spec}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
