




import axios, { AxiosResponse } from 'axios';


const ordersServiceURL = 'http://localhost:3000/dev';
const kitchenServiceURL = 'http://localhost:3001/dev';
const inventoryServiceURL = 'http://localhost:3002/dev';


interface InventoryItem {
    ingredient: string;
    quantity: number;
  }
  

  interface OrderHistoryItem {
    id: string;
    dish: string;
    createdAt: string;
  }

export const getInventory = async (): Promise<InventoryItem[]> => {
    const response: AxiosResponse<InventoryItem[]> = await axios.get(`${inventoryServiceURL}/inventory`);
    return response.data;
  };
  
  // Función para obtener el historial de pedidos
  export const getOrderHistory = async (): Promise<OrderHistoryItem[]> => {
    const response: AxiosResponse<OrderHistoryItem[]> = await axios.get(`${kitchenServiceURL}/history`);
    return response.data;
  };


  export const createOrder = async () => {
    await axios.post(`${ordersServiceURL}/order`);
  };
  
/*
export const getOrderStatus = async () => {
    const response = await axios.get(`${API_BASE_URL}/orders/status`);
    return response.data;
  };
  */