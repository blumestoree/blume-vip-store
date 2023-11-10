export interface InputFindCategoryDto {
  id: string;
}
export interface OutputFindCategoryDto {
  id: string;
  name: string;
  serverId: string;
  products: {
    id: string;
    name: string;
    price: number;
    image: string;
  }[];
}
