import axios from "axios";

const API_BASE = "http://localhost:4004/rest/delivery"; // or your deployed URL

export const fetchDeliveries = () =>
  axios.get(`${API_BASE}/Deliveries`).then((res) => res.data);

export const scheduleDelivery = (data) =>
  axios.post(`${API_BASE}/scheduleDelivery`, { data });

export const printLabel = (ID) => axios.post(`${API_BASE}/printLabel`, { ID });
