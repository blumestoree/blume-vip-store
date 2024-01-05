export interface InputFindAllProductDto {
  serverId: string;
  sort: 'desc' | 'asc' | undefined;
  categoryId: string[] | undefined;
}
export interface OutputFindAllProductDto {
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
