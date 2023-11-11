export interface InputAddItemToPlayertDto {
  token: string;
  func: string;
  params: {
    user_id: string;
    item: string;
  };
}

export default interface AddItemToPlayerInterface {
  addItemToPlayer(input: InputAddItemToPlayertDto): Promise<void>;
}
