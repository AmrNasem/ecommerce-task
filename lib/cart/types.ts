import { IProduct } from "../product/types";

export interface ICartItem {
  id: string;
  quantity: number;
  product: IProduct;
};