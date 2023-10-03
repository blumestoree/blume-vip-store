export interface InputCreateServerOwnerDto {
  name: string;
  email: string;
  password: string;
}
export interface OutputCreateServerOwnerDto {
  id: string;
  name: string;
  email: string;
  serverId?: number;
}
