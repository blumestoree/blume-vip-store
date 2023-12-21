export interface InputAddItemToPlayertDto {
  token: string;
  functions: string;
  gameUserId: string;
  gameItemName: string;
}

export default interface AddItemToPlayerInterface {
  addItem(input: InputAddItemToPlayertDto): Promise<void>;
}
