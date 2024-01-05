export interface InputFindProductDto {
  id: string;
}
export interface OutputFindProductDto {
  id: string;
  name: string;
  gameItemName: string;
  image: string;
  price: number;
  categoryId: string;
  serverId: string;
  category: {
    id: string;
    name: string;
  } | null;
}
