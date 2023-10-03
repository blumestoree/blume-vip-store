export interface InputUpdateServerOwnerDto {
  id: string;
  name: string;
  email: string;
  password: string;
  serverId?: string;
}
export interface OutputCreateServerOwnerDto {
  id: string;
  name: string;
  email: string;
  serverId?: string;
}
