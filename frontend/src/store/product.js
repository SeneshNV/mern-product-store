import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProduct: (products) => set({ products }),

  //POST the product
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields" };
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    let data;
    try {
      data = await res.json();
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      return { success: false, message: "Invalid response from the server" };
    }

    if (!res.ok) {
      return { success: false, message: data.message || "Server error" };
    }

    set((state) => ({ products: [...state.products, data.data] }));

    return { success: true, message: "Product created successfully" };
  },

  //Get the product
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },

  //delete the products
  deleteProducts: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "Delete",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    set((state) => ({
      products: state.products.filter((product) => product.id !== pid),
    }));
    return { success: true, message: "Product deleted successfully" };
  },

  //put the product
  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });

    let data;
    try {
      data = await res.json();
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      return { success: false, message: "Invalid response from the server" };
    }

    if (!res.ok) {
      return { success: false, message: data.message || "Server error" };
    }

    // Update the state directly to avoid an extra fetch
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));

    return { success: true, message: "Product updated successfully" };
  },
}));
