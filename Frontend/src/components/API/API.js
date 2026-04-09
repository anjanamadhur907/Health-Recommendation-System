const BASE_URL = "http://localhost:3000";

const API = {
    LOGIN: `${BASE_URL}/user/login`,
    REGISTER: `${BASE_URL}/user/`,

    GET_SYMPTOMS: `${BASE_URL}/symptom`,
    PREDICT: `${BASE_URL}/predict`,
    SMART_PREDICT: `${BASE_URL}/disease/smart-predict`
};

export default API;