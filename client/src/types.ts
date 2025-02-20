export interface Seller {
  _id: string;
  account_name: string;
  branch: string;
  amount: number;
  description?: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface SellerFormData {
  account_name: string;
  branch: string;
  amount: number;
  description?: string;
  date: string;
}
