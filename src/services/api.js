import axios from "axios";

const API = axios.create({
  baseURL: "https://flat-maintenance-backend.onrender.com/api"
});

export default API;
