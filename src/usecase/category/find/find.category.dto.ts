export interface InputFindCategoryDto {
  id: string;
}
export interface OutputFindCategoryDto {
  id: string;
  name: string;
  products: {
    id: string;
    name: string;
    price: number;
    image: string;
  }[];
}
