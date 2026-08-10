import { useEffect, useState } from 'react';
import { getCategories, getProducts } from '../api/api.js';
import ProductCard from '../components/ProductCard.jsx';

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
    getProducts().then(setProducts);
  }, []);

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">New season • premium deals</p>
          <h2>Discover the future of electronics</h2>
          <p>Shop smartphones, laptops, audio, and smart home devices in one modern experience.</p>
        </div>
        <div className="hero-card">
          <h3>Featured launch</h3>
          <p>Aurora X1 Smartphone</p>
          <span>From R999</span>
        </div>
      </section>

      <section className="section">
        <h3>Shop by category</h3>
        <div className="chips">
          {categories.map((category) => (
            <span key={category}>{category}</span>
          ))}
        </div>
      </section>

      <section className="section">
        <h3>Popular products</h3>
        <div className="card-grid">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </section>
    </>
  );
}
