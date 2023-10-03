export interface OutputFindAllServerOwnerDto {
  serverOwners: {
    id: string;
    name: string;
    email: string;
    serverId?: string;
  }[];
}
