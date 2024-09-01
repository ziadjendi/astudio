import axios from "axios";

const API = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
  },
});

export default API;
