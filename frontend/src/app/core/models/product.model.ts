export interface Product {
  id?: number;
  name: string;
  description: string;
  sku: string;
  category: number;
  category_name?: string;
  supplier: number;
  supplier_name?: string;
  price: number;
  quantity: number;
  min_stock: number;
  image?: string;
  created_at?: string;
  updated_at?: string;
}

export interface StockMovement {
  id?: number;
  product: number;
  product_name?: string;
  movement_type: 'IN' | 'OUT' | 'ADJ';
  quantity: number;
  notes?: string;
  created_at?: string;
  created_by?: number;
  created_by_username?: string;
}
