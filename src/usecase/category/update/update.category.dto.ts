export interface InputUpdateCategoryDto {
  id: string;
  name: string;
}
export interface OutputCreateCategoryDto {
  id: string;
  name: string;
  products: {
    id: string;
    name: string;
    price: number;
    image: string;
  }[];
}
