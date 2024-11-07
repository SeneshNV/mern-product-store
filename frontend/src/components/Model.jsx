import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../pages/HomePage/HomePage.css";

function Modal({ setShowModal, product, updateProduct, fetchProducts }) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || "",
    image: product?.image || "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProduct = async () => {
    const { success } = await updateProduct(product._id, formData);
    if (success) {
      await fetchProducts();
      setShowModal(false);
    } else {
      alert("Failed to update product.");
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Product</h2>
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </label>
          <button
            type="button"
            onClick={handleUpdateProduct}
            className="update-button"
          >
            Update Product
          </button>
          <button onClick={() => setShowModal(false)} className="close-button">
            Close
          </button>
        </form>
      </div>
    </div>,
    document.body // Render modal directly into the body
  );
}

export default Modal;
