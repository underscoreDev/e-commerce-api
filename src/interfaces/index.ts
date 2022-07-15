/* eslint-disable no-unused-vars */
// ORDERS

export enum OrderStatusType {
  active = "active",
  completed = "completed",
  speakers = "speakers",
}

export interface OrderType {
  quantity: number;
  status: OrderStatusType;
  user_id: string;
  product_id: string;
}
export interface OrderStatus {
  status: OrderStatusType | string;
  user_id: string;
}

export interface OrderReturnType extends OrderType {
  order_id: string;
}

// AUTH
export interface AuthModelProps {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
export interface AuthLoginModelProps {
  email: string;
  password: string;
}

// pRODUCT

export enum ProductCategoryValues {
  earphones = "earphones",
  speakers = "speakers",
  headsets = "headsets",
}
export interface ProductsModelProps {
  product_id?: string;
  product_name: string;
  price: number;
  category: ProductCategoryValues;
}

// USER
export interface UpdateUserProps {
  firstname: string;
  lastname: string;
  email: string;
  user_id: string;
}

export interface UserModelProps extends UpdateUserProps {
  password: string;
}
