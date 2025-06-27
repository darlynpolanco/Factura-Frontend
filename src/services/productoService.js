import api from "./api";

export const getProductos = async () => {
  try {
    return await api.get("/api/Productos");
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Error al obtener productos"
    );
  }
};

export const createProducto = async (producto) => {
  try {
    return await api.post("/api/Productos", producto);
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Error al crear producto"
    );
  }
};

export const getProducto = async (id) => {
  try {
    return await api.get(`/api/Productos/${id}`);
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Error al obtener producto"
    );
  }
};

export const updateProducto = async (id, producto) => {
  try {
    return await api.put(`/api/Productos/${id}`, producto);
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Error al actualizar producto"
    );
  }
};

export const deleteProducto = async (id) => {
  try {
    return await api.delete(`/api/Productos/${id}`);
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Error al eliminar producto"
    );
  }
};
