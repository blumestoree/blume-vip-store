export interface InputFindServerOwnerDto {
  id: string;
}
export interface OutputFindServerOwnerDto {
  id: string;
  name: string;
  email: string;
  serverId?: string;
}
