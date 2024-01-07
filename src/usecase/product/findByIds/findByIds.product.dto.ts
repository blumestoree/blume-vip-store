export interface InputFindProductsByIdsDto {
  id: string[];
}
export interface OutpuFfindProductsByIdsDto {
  id: string;
  name: string;
  gameItemName: string;
  image: string;
  price: number;
  serverId: string;
  categoryId: string;
  category: {
    functionInGame: string;
    id: string;
    name: string;
  } | null;
}
