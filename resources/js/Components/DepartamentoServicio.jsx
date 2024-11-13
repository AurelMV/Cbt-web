import axios from 'axios';
const API_DEPARTAMENTO = 'http://127.0.0.1:8000/api/Departamento';
const API_PROVINCIA = 'http://127.0.0.1:8000/api/Provincia';
const API_DISTRITO = 'http://127.0.0.1:8000/api/Distrito';
const API_COLEGIO = 'http://127.0.0.1:8000/api/Colegio';
const ServicioListado = {
    // Obtener todos los colegios
    indexDepa: async () => {
        try {
            const response = await axios.get(API_DEPARTAMENTO);
            return response.data.data; 
        } catch (error) {
            console.error("Error en index:", error);
            throw error;
        }
    },
    ConsultaProvi: async (id) => {
        try {
            const response = await axios.get(`${API_PROVINCIA}/Consulta/${id}`);
            return response.data.data; 
        } catch (error) {
            console.error("Error en index:", error);
            throw error;
        }
    },
    ConsultaDistri: async (id) => {
        try {
            const response = await axios.get(`${API_DISTRITO}/Consulta/${id}`);
            return response.data.data; 
        } catch (error) {
            console.error("Error en index:", error);
            throw error;
        }
    },
    ConsultaColegio: async (id) => {
        try {
            const response = await axios.get(`${API_COLEGIO}/Consulta/${id}`);
            return response.data.data; 
        } catch (error) {
            console.error("Error en index:", error);
            throw error;
        }
    },
    // Obtener un colegio por ID
    show: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error en show:", error);
            throw error;
        }
    },

    // Crear un nuevo colegio
    store: async (colegioData) => {
        try {
            const response = await axios.post(API_URL, colegioData);
            return response.data;
        } catch (error) {
            console.error("Error en store:", error);
            throw error;
        }
    },

    // Actualizar un colegio por ID
    update: async (id, colegioData) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, colegioData);
            return response.data;
        } catch (error) {
            console.error("Error en update:", error);
            throw error;
        }
    },

    // Eliminar un colegio por ID
    delete: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error en delete:", error);
            throw error;
        }
    }
};

export default ServicioListado;