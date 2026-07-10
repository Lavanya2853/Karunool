import axios from 'axios';

const API_URL = 'http://localhost:8080/api/artisans';

export const getAllArtisans = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching artisans:", error);
        throw error;
    }
};

export const getArtisanById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching artisan ${id}:`, error);
        throw error;
    }
};

export const createArtisan = async (artisanData) => {
    try {
        const response = await axios.post(API_URL, artisanData);
        return response.data;
    } catch (error) {
        console.error("Error creating artisan:", error);
        throw error;
    }
};
