import axios from "axios";

const server = "https://sample-njvf.onrender.com";

const api = axios.create({
  baseURL: `${server}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Products API
export const getProducts = async (params = {}) => {
  try {
    const response = await api.get("/products", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await api.post("/products", productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// Contact API
export const submitContactForm = async (formData) => {
  try {
    const response = await api.post("/contact", formData);
    return response.data;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};

export const getMessages = async () => {
  try {
    const response = await api.get("/contact");
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

export const userLogin = async (email, password) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const response = await axios.post(
      `/api/user/login`,
      { email, password },
      config
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export default api;
