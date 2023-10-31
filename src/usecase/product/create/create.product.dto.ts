export interface InputCreateProductDto {
  name: string;
  image: string;
  price: number;
  serverId: string;
}
export interface OutputCreateProductDto {
  id: string;
  name: string;
  image: string;
  price: number;
  serverId: string;
}
