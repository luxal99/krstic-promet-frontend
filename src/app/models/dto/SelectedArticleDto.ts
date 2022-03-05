export interface SelectedArticleDto {
  id?: number;
  name: string;
  sellingPrice: number;
  total: number;
  amount: number;
  amountInWarehouse?: number;
  code: string;
  payedAmount: number;
  deliveredAmount: number;
}
