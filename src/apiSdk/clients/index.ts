import axios from 'axios';
import queryString from 'query-string';
import { ClientInterface, ClientGetQueryInterface } from 'interfaces/client';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getClients = async (query?: ClientGetQueryInterface): Promise<PaginatedInterface<ClientInterface>> => {
  const response = await axios.get('/api/clients', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createClient = async (client: ClientInterface) => {
  const response = await axios.post('/api/clients', client);
  return response.data;
};

export const updateClientById = async (id: string, client: ClientInterface) => {
  const response = await axios.put(`/api/clients/${id}`, client);
  return response.data;
};

export const getClientById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/clients/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteClientById = async (id: string) => {
  const response = await axios.delete(`/api/clients/${id}`);
  return response.data;
};
