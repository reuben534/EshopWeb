import { useEffect, useMemo, useState } from 'react';
import { getCategories, getProducts } from '../api/api.js';
import ProductCard from '../components/ProductCard.jsx';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortMethod, setSortMethod] = useState('newest');
  const [listView, setListView] = useState(false);

  useEffect(() => {
    getProducts().then(setProducts);
    getCategories().then(setCategories);
  }, []);

  const filteredProducts = useMemo(() => {
    let items = [...products];

    if (selectedCategory !== 'All') {
      items = items.filter((product) => product.category === selectedCategory);
    }

    if (sortMethod === 'price-low') {
      items.sort((a, b) => a.price - b.price);
    } else if (sortMethod === 'price-high') {
      items.sort((a, b) => b.price - a.price);
    } else if (sortMethod === 'top-rated') {
      items.sort((a, b) => b.rating - a.rating);
    }

    return items;
  }, [products, selectedCategory, sortMethod]);

  return (
    <section className="section">
      <div className="page-header">
        <div>
          <h3>Product catalog</h3>
          <p>Browse all electronics by category or sort by price and rating.</p>
        </div>
        <div className="view-toggle">
          <button type="button" onClick={() => setListView(false)}>Grid</button>
          <button type="button" onClick={() => setListView(true)}>List</button>
        </div>
      </div>

      <div className="filter-bar">
        <label>
          Category:
          <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
            <option>All</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>

        <label>
          Sort:
          <select value={sortMethod} onChange={(event) => setSortMethod(event.target.value)}>
            <option value="newest">Newest</option>
            <option value="price-low">Price Low to High</option>
            <option value="price-high">Price High to Low</option>
            <option value="top-rated">Top Rated</option>
          </select>
        </label>
      </div>

      <div className={listView ? 'list-grid' : 'card-grid'}>
        {filteredProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}
