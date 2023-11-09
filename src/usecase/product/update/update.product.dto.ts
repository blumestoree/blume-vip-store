export interface InputUpdateProductDto {
  id: string;
  serverId: string;
  name: string;
  image: string;
  price: number;
}
export interface OutputCreateProductDto {
  id: string;
  serverId: string;
  name: string;
  image: string;
  price: number;
  categoryId: string;
  category: {
    id: string;
    name: string;
  } | null;
}
