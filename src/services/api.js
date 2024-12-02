import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const flightApi = {
  getAll: () => api.get('/flights'),
  getById: (id) => api.get(`/flights/${id}`),
  create: (data) => api.post('/flights', data),
  update: (id, data) => api.put(`/flights/${id}`, data),
  delete: (id) => api.delete(`/flights/${id}`),
  search: (params) => api.get('/flights/search', { params }),
  getPassengerAirports: (id) => api.get(`/flights/passenger/${id}/airports`),
  getPassengerAircraft: (id) => api.get(`/flights/passenger/${id}/aircraft`),
};

export const airportApi = {
  getAll: () => api.get('/airports'),
  getById: (id) => api.get(`/airports/${id}`),
  create: (data) => api.post('/airports', data),
  update: (id, data) => api.put(`/airports/${id}`, data),
  delete: (id) => api.delete(`/airports/${id}`),
  getByCityId: (cityId) => api.get(`/airports/${cityId}/airports`),
};

export const aircraftApi = {
  getAll: () => api.get('/aircraft'),
  getById: (id) => api.get(`/aircraft/${id}`),
  create: (data) => api.post('/aircraft', data),
  update: (id, data) => api.put(`/aircraft/${id}`, data),
  delete: (id) => api.delete(`/aircraft/${id}`),
  getAuthorizedAirports: (id) => api.get(`/aircraft/${id}/airports`),
};

export const passengerApi = {
  getAll: () => api.get('/passengers'),
  getById: (id) => api.get(`/passengers/${id}`),
  create: (data) => api.post('/passengers', data),
  update: (id, data) => api.put(`/passengers/${id}`, data),
  delete: (id) => api.delete(`/passengers/${id}`),
  getAircraft: (id) => api.get(`/passengers/${id}/aircraft`),
  getFlightHistory: (id) => api.get(`/flights/passenger/${id}/airports`),
};

export const cityApi = {
  getAll: () => api.get('/cities'),
  getById: (id) => api.get(`/cities/${id}`),
  create: (data) => api.post('/cities', data),
  update: (id, data) => api.put(`/cities/${id}`, data),
  delete: (id) => api.delete(`/cities/${id}`),
};

export default api;