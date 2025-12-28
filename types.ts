export interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  price: number | null;
  checked: boolean;
}

export interface ShoppingList {
  id: string;
  name: string;
  items: ShoppingItem[];
}

export type ViewState = 'loading' | 'auth' | 'dashboard' | 'list';

export interface User {
  uid: string;
  email: string | null;
}