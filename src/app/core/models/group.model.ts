import { ProductModel } from './product.model';

export interface GroupModel {
  uid: string;
  name: string;
  persons: string[];
  products: ProductModel[];
}
