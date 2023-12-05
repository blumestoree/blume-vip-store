export interface InputFindAllProductDto {
  serverId: string;
}
export interface OutputFindAllProductDto {
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
