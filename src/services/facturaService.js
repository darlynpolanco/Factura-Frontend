import api from "./api";

export const createFactura = async (factura) => {
  try {
    // Timeout aumentado a 60 segundos para creación de facturas
    const data = await api.post("/api/Facturas", factura, { timeout: 60000 });
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "Error al crear factura"
    );
  }
};

export const getFactura = async (id) => {
  try {
    const data = await api.get(`/api/Facturas/${id}`);
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Error al obtener factura"
    );
  }
};

export const getFacturas = async () => {
  try {
    const data = await api.get("/api/Facturas");
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Error al obtener facturas"
    );
  }
};

// export const getFacturasByClienteId = async (clienteId) => {
//   try {
//     const allFacturas = await getFacturas();
//     return allFacturas.filter(f => f.clienteId === clienteId);
//   } catch (error) {
//     throw new Error(
//       error.response?.data?.message || error.message || "Error al obtener facturas por cliente"
//     );
//   }
// };
