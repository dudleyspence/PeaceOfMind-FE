import axios from "axios";

export const peaceOfMindAPI = axios.create({
  baseURL: "https://peaceofmind-api-production.up.railway.app/api",
});
