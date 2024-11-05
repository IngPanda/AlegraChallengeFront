import axios from 'axios';

// Define la URL base para los microservicios
const API_BASE_URL = "http://localhost";  // Cambia a la URL de tus microservicios en producción

// Endpoint para el servicio de pedidos (orders-service)
export const requestOrder = async () => {
  console.log('AQUI ',localStorage.getItem('token'));
  const callAxios = await axios.post('https://vnfx11zfya.execute-api.us-east-1.amazonaws.com/dev/order', {
  }, {
    headers: {
      'Authorization': `Bearer ${ localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'      
    },
  });
  console.log(callAxios);
  return callAxios;
  
};

// Endpoint para el servicio de cocina (kitchen-service)
export const prepareOrder = (dish: { name: string; ingredients: { [key: string]: number } }) => {
  return axios.put(`${API_BASE_URL}:4001/dev/prepare`, { dish });
};

// Endpoint para el servicio de inventario (inventory-service)
export const getInventory = () => {
  return axios.get(`${API_BASE_URL}:4002/dev/inventory`);
};

// Endpoint para obtener el historial de pedidos
export const getOrderHistory = () => {
  return axios.get(`${API_BASE_URL}:4001/dev/history`);
};
