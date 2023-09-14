import axios from 'axios';
import queryString from 'query-string';
import { BusinessInterface, BusinessGetQueryInterface } from 'interfaces/business';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getBusinesses = async (
  query?: BusinessGetQueryInterface,
): Promise<PaginatedInterface<BusinessInterface>> => {
  const response = await axios.get('/api/businesses', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createBusiness = async (business: BusinessInterface) => {
  const response = await axios.post('/api/businesses', business);
  return response.data;
};

export const updateBusinessById = async (id: string, business: BusinessInterface) => {
  const response = await axios.put(`/api/businesses/${id}`, business);
  return response.data;
};

export const getBusinessById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/businesses/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBusinessById = async (id: string) => {
  const response = await axios.delete(`/api/businesses/${id}`);
  return response.data;
};
