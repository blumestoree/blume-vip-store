export interface InputFindProductsFacadeDto {
  id: string[];
}
export interface OutputFindProductsFacadeDto {
  id: string;
  name: string;
  price: number;
  serverId: string;
}

export default interface ProductFacadeInterface {
  findProductsByIds(input: InputFindProductsFacadeDto): Promise<OutputFindProductsFacadeDto[]>;
}
