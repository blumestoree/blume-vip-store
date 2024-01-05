export interface InputCreateProductDto {
  name: string;
  gameItemName: string;
  image: string;
  categoryId: string;
  price: number;
  serverId: string;
}
export interface OutputCreateProductDto {
  id: string;
  name: string;
  gameItemName: string;
  categoryId: string;
  image: string;
  price: number;
  serverId: string;
  category: {
    id: string;
    name: string;
  } | null;
}
