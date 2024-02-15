export interface InputCreateServerDto {
  name: string;
  image: string;
  banner: string[];
  serverOwnerId: string;
}
export interface OutputCreateServerDto {
  id: string;
  name: string;
  image: string;
  banner: string[];
  serverOwnerId: string;
}
