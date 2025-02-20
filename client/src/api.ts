import axios from 'axios';
import { Seller, SellerFormData } from './types';

const API_BASE_URL = 'http://localhost:8080/api';

export const api = {
  getSellers: () => 
    axios.get<Seller[]>(`${API_BASE_URL}/seller`),
  
  addSeller: (data: SellerFormData) =>
    axios.post<Seller>(`${API_BASE_URL}/add-seller`, data),
  
  updateSeller: (id: string, data: SellerFormData) =>
    axios.put<Seller>(`${API_BASE_URL}/update-seller/${id}`, data),
  
  deleteSeller: (id: string) =>
    axios.delete(`${API_BASE_URL}/delete-seller/${id}`)
};