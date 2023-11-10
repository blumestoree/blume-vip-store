export interface InputUpdateCategoryDto {
  id: string;
  name: string;
  serverId: string;
}
export interface OutputCreateCategoryDto {
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
