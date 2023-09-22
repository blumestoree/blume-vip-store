export interface InputCreateProductDto {
  name: string;
  price: number;
  serverId: number;
}
export interface OutputCreateProductDto {
  productId: string;
  name: string;
  price: number;
  serverId: number;
}
