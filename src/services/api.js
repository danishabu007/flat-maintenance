import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api" // backend baad me connect karenge
});

export default API;
