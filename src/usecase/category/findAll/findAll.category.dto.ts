export interface OutputFindAllCategoryDto {
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
