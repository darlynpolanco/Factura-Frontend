import api from "./api";

// Obtener todos los clientes
export const getClientes = async () => {
  try {
    const data = await api.get("/api/Clientes");
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "Error al cargar clientes"
    );
  }
};

// Crear cliente
export const createCliente = async (cliente) => {
  try {
    const data = await api.post("/api/Clientes", cliente);
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "Error al crear cliente"
    );
  }
};

// Actualizar cliente
export const updateCliente = async (id, cliente) => {
  try {
    const data = await api.put(`/api/Clientes/${id}`, cliente);
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "Error al actualizar cliente"
    );
  }
};

// Eliminar cliente
export const deleteCliente = async (id) => {
  try {
    const data = await api.delete(`/api/Clientes/${id}`);
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "Error al eliminar cliente"
    );
  }
};

// Obtener un solo cliente
export const getCliente = async (id) => {
  try {
    const data = await api.get(`/api/Clientes/${id}`);
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "Error al cargar cliente"
    );
  }
};