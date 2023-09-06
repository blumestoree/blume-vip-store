export interface InputUpdateServerOwnerDto {
  serverOwnerId: string;
  name: string;
  email: string;
  password: string;
  serverId?: number;
}
export interface InputCreateServerOwnerDto {
  serverOwnerId: string;
  name: string;
  email: string;
  serverId?: number;
}
