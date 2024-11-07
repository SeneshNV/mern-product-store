import React, { useState } from "react";
import { useProductStore } from "../../store/product";
import styles from "./CreatePage.module.css";

function CreatePage() {
  const [newProduct, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    setMessage(message);
    setMessageType(success ? "success" : "error");

    if (success) {
      setProduct({ name: "", price: "", image: "" });
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create New Product</h2>
      <div className={styles.form}>
        <input
          name="name"
          value={newProduct.name}
          onChange={(e) => setProduct({ ...newProduct, name: e.target.value })}
          placeholder="Enter product name"
          className={styles.input}
        />
        <input
          name="price"
          value={newProduct.price}
          onChange={(e) => setProduct({ ...newProduct, price: e.target.value })}
          placeholder="Enter product price"
          className={styles.input}
        />
        <input
          name="image"
          value={newProduct.image}
          onChange={(e) => setProduct({ ...newProduct, image: e.target.value })}
          placeholder="Enter product image link"
          className={styles.input}
        />
        <button onClick={handleAddProduct} className={styles.button}>
          Add Product
        </button>
      </div>
      {message && (
        <div className={`${styles.popup} ${styles[messageType]}`}>
          {message}
        </div>
      )}
    </div>
  );
}

export default CreatePage;
