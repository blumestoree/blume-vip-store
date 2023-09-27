export interface InputCreateServerOwnerDto {
  name: string;
  email: string;
  password: string;
}
export interface OutputCreateServerOwnerDto {
  serverOwnerId: string;
  name: string;
  email: string;
}
