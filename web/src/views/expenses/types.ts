export interface Expense {
  id: string;
  name: string;
  payment: string;
  tags: string[];
  price: string;
  created_at: Date;
}
