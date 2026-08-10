import { Link } from 'react-router-dom';
import { formatZAR } from '../utils/currency.js';

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.name} />
        <h4>{product.name}</h4>
        <p>{product.description}</p>
        <div className="meta">✨ {product.category}</div>
        <div className="card-price">💰 {formatZAR(product.price)}</div>
      </Link>
    </article>
  );
}
