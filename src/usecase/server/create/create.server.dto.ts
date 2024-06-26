export interface InputCreateServerDto {
  name: string;
  image: string;
  banner: string[];
  serverOwnerId: string;
  product: string[];
  category: string[];
}
export interface OutputCreateServerDto {
  id: string;
  name: string;
  image: string;
  banner: string[];
  serverOwnerId: string;
  product: string[];
  category: string[];
}
