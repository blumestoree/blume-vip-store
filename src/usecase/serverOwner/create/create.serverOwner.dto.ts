export interface InputCreateServerOwnerDto {
  name: string;
  email: string;
  password: string;
  serverId?: number;
}
export interface OutputCreateServerOwnerDto {
  serverOwnerId: string;
  name: string;
  email: string;
  serverId?: number;
}
