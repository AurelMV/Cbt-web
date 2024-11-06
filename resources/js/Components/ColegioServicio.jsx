import React, { useEffect, useState } from 'react';
import ColegioServicio from '@/Components/ColegioServicio';

const [colegios, setColegios] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchColegios = async () => {
            try {
                const data = await ColegioServicio.index();
                setColegios(data);
            } catch (error) {
                setError("Error al obtener los datos: " + error.message);
            }
        };

        fetchColegios();
    }, []);





import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000/api/Colegio';
const ColegioServicio = {
    // Obtener todos los colegios
    index: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data.data; // Devuelve solo los datos de colegios
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

export default ColegioServicio;