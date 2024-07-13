export interface InputFindCategoryFacadeDto {
  id: string;
}
export interface OutputFindCategoryFacadeDto {
  id: string;
  name: string;
  functionInGame: string;
  serverId: string;
}

export default interface CategoryFacadeInterface {
  findCategoryById(input: InputFindCategoryFacadeDto): Promise<OutputFindCategoryFacadeDto>;
}
