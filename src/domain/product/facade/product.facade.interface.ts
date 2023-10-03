export interface InputFindProductFacadeDto {
  id: string;
}
export interface OutputFindProductFacadeDto {
  id: string;
  name: string;
  price: number;
  serverId: string;
}

export default interface ProductFacadeInterface {
  findProduct(input: InputFindProductFacadeDto): Promise<OutputFindProductFacadeDto>;
}
