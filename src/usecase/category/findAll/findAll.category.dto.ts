export interface InputFindAllCategoryDto {
  serverId: string;
}
export interface OutputFindAllCategoryDto {
  id: string;
  name: string;
  serverId: string;
  products: {
    id: string;
    name: string;
    categoryId: string;
    image: string;
    price: number;
    serverId: string;
  }[];
}
