export interface InputAddItemToPlayertDto {
  token: string;
  functionInGame: string;
  gameUserId: string;
  gameItemName: string;
}

export default interface AddItemToPlayerInterface {
  addItem(input: InputAddItemToPlayertDto): Promise<void>;
}
