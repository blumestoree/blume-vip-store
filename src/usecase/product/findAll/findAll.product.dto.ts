export interface OutputFindAllProductDto {
  products: {
    productId: string;
    name: string;
    price: number;
    serverId: number;
  }[];
}
