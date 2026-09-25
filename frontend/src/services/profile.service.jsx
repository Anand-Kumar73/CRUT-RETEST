import axios from "axios";

const API_URL = "http://localhost:3000/api/profile/users";

export const getProfileDetails = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};
