export interface InputUpdateServerDto {
  id: string;
  name: string;
  image: string;
  banner: string[];
  serverOwnerId: string;
}
export interface OutputCreateServerDto {
  id: string;
  name: string;
  image: string;
  banner: string[];
  serverOwnerId: string;
  products: string[];
  categories: string[];
}
