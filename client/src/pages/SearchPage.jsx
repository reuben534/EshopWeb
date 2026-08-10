import { useEffect, useMemo, useState } from 'react';
import { getProducts } from '../api/api.js';
import ProductCard from '../components/ProductCard.jsx';

export default function SearchPage() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const filtered = useMemo(() => {
    return products.filter((product) =>
      [product.name, product.category, product.brand, product.sku]
        .join(' ')
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [products, query]);

  return (
    <section className="section">
      <h3>Search products</h3>
      <input
        className="search-input"
        placeholder="Search by name, SKU, brand, category"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className="card-grid">
        {filtered.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}
