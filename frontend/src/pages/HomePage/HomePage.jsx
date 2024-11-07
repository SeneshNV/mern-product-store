import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../../store/product";
import ProductCard from "../../components/ProductCard";
import "./HomePage.css";

function HomePage() {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="container">
      <div className="header">
        <h1>Current Products</h1>
      </div>
      {products.length === 0 ? (
        <div className="no-products">
          <h3>No Products found 😟</h3>
          <Link to="/create" className="create-link">
            Create a product 🤗
          </Link>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
