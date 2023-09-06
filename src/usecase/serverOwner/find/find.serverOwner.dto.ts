export interface InputFindServerOwnerDto {
  serverOwnerId: string;
}
export interface OutputFindServerOwnerDto {
  serverOwnerId: string;
  name: string;
  email: string;
  serverId?: number;
}
