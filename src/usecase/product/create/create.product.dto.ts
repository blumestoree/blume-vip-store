export interface InputCreateProductDto {
  name: string;
  image: string;
  categoryId: string;
  price: number;
  serverId: string;
}
export interface OutputCreateProductDto {
  id: string;
  name: string;
  categoryId: string;
  image: string;
  price: number;
  serverId: string;
  category: {
    id: string;
    name: string;
  } | null;
}
