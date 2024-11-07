import React, { useState } from "react";
import "../pages/HomePage/HomePage.css";
import { useProductStore } from "../store/product";
import Modal from "./Model.jsx";

function ProductCard({ product }) {
  const { deleteProducts, fetchProducts, updateProduct } = useProductStore();
  const [showModal, setShowModal] = useState(false);

  const handleDeleteProduct = async (pid) => {
    const { success } = await deleteProducts(pid);
    if (success) fetchProducts();
  };

  const handleEditProduct = () => {
    setShowModal(true); // Open modal for editing
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name || "Product image"} />
      <p className="product-name">{product.name}</p>
      <p className="product-price">${product.price}</p>
      <button onClick={handleEditProduct}>Edit 📝</button>
      <button onClick={() => handleDeleteProduct(product._id)}>
        Delete 🚮
      </button>

      {/* Conditionally render Modal component based on showModal state */}
      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          product={product}
          updateProduct={updateProduct}
          fetchProducts={fetchProducts}
        />
      )}
    </div>
  );
}

export default ProductCard;
