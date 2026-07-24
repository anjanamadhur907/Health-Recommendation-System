const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const API = {
    LOGIN: `${BASE_URL}/user/login`,
    REGISTER: `${BASE_URL}/user`,

    GET_SYMPTOMS: `${BASE_URL}/symptom`,
    PREDICT: `${BASE_URL}/disease/predict`,
    SMART_PREDICT: `${BASE_URL}/disease/smart-predict`
};

export default API;