export interface OutputFindAllProductDto {
  products: {
    id: string;
    name: string;
    price: number;
    serverId: string;
  }[];
}
