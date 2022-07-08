// ORDERS
export interface OrderType {
  quantity: string;
  status: "active" | "completed";
  user_id: string;
  product_id: string;
}
export interface OrderStatus {
  status: "active" | "completed" | string;
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
export interface ProductsModelProps {
  product_id?: string;
  product_name: string;
  price: number;
  category: "headsets" | "earphones" | "speakers";
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
