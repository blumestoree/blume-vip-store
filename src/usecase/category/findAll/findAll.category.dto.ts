export interface OutputFindAllCategoryDto {
  id: string;
  name: string;
  products: {
    id: string;
    name: string;
    price: number;
    image: string;
  }[];
}
