const baseURL = "http://localhost:5295";

const api = {
  async request(endpoint, { method = 'GET', data, headers, timeout = 15000, ...customConfig } = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    const defaultHeaders = {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    };

    const config = {
      method,
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      ...customConfig,
      signal: controller.signal,
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${baseURL}${endpoint}`, config);
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: response.statusText };
        }
        return Promise.reject({
          response: {
            status: response.status,
            data: errorData,
          }
        });
      }

      return response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        console.error("Timeout: El servidor no respondió a tiempo");
        return Promise.reject(
          new Error(`El servidor no respondió a tiempo (${timeout}ms). Por favor intenta de nuevo.`)
        );
      }

      if (error.name === 'TypeError') {
        console.error("Error de red:", error.message);
        return Promise.reject(
          new Error("Error de conexión con el servidor. Verifica que el backend está corriendo en " + baseURL)
        );
      }

      return Promise.reject(error);
    }
  },

  get(endpoint, config = {}) {
    return this.request(endpoint, { ...config, method: 'GET' });
  },

  post(endpoint, data, config = {}) {
    return this.request(endpoint, { ...config, method: 'POST', data });
  },

  put(endpoint, data, config = {}) {
    return this.request(endpoint, { ...config, method: 'PUT', data });
  },

  delete(endpoint, config = {}) {
    return this.request(endpoint, { ...config, method: 'DELETE' });
  }
};

export default api;