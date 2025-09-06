export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  images: string[];
  stockQuantity : number
}

export interface Order {
  id: string;
  customerName: string;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  items: number;
}

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'John Doe',
    total: 299.99,
    status: 'Delivered',
    date: '2025-01-15',
    items: 1
  },
  {
    id: 'ORD-002',
    customerName: 'Sarah Wilson',
    total: 529.98,
    status: 'Shipped',
    date: '2025-01-14',
    items: 2
  },
  {
    id: 'ORD-003',
    customerName: 'Mike Johnson',
    total: 79.99,
    status: 'Processing',
    date: '2025-01-14',
    items: 1
  },
  {
    id: 'ORD-004',
    customerName: 'Emily Davis',
    total: 899.99,
    status: 'Pending',
    date: '2025-01-13',
    items: 1
  },
  {
    id: 'ORD-005',
    customerName: 'Robert Brown',
    total: 449.99,
    status: 'Delivered',
    date: '2025-01-12',
    items: 1
  },
  {
    id: 'ORD-006',
    customerName: 'Lisa Anderson',
    total: 159.98,
    status: 'Cancelled',
    date: '2025-01-11',
    items: 2
  }
];