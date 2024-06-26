export interface InputFindServerDto {
  id: string;
}
export interface OutputFindServerDto {
  id: string;
  name: string;
  image: string;
  banner: string[];
  serverOwnerId: string;
  product: string[];
  category: string[];
}
